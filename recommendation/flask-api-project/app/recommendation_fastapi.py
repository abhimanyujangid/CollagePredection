from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

router = APIRouter()

# MongoDB connection setup (update URI as needed)
client = MongoClient("mongodb+srv://abhimanyujangid79:collegePrediction@cluster0.5us5i.mongodb.net")
db = client['collegePredection']
colleges_collection = db['colleges']
student_educational_collection = db['studenteducationals']
student_profile_collection = db['studentprofiles']

@router.post("/api/recommendations")
async def get_college_recommendations(request: Request):
    try:
        print("Received request for recommendations")
        data = await request.json()
        branch = data.get('branch')
        course = data.get('course')
        location = data.get('location')
        priorities = data.get('priorities')
        user_id = data.get('userId')

        print(f"Input: branch={branch}, course={course}, location={location}, user_id={user_id}")

        if not branch or not course or not location or not priorities or not user_id:
            raise HTTPException(status_code=400, detail='Missing required fields.')

        # Fetch user educational details
        user_edu = student_educational_collection.find_one({'userId': ObjectId(user_id)})
        if not user_edu:
            raise HTTPException(status_code=404, detail='User educational details not found.')
        

        # Fetch user profile details (for caste/category)
        user_profile = student_profile_collection.find_one({'userId': ObjectId(user_id)})
        if not user_profile:
            raise HTTPException(status_code=404, detail='User profile not found.')

        # Gather student details
        student_state = user_profile.get('state')
        student_caste = user_profile.get('cast')
        student_gender = user_profile.get('gender', 'Any')
        student_exams = {exam.get('examName'): exam for exam in user_edu.get('competitiveExams', [])}

        # Debug prints for typeOfCollege and sample college document

        # 1. Filter colleges by preferred location (state) and branch
        college_query = {
            'typeOfCollege': {'$regex': f'^{branch}$', '$options': 'i'}
        }
        if location != 'anywhere' and isinstance(location, dict) and location.get('state') and location['state'].lower() != 'anywhere':
            college_query['address.state'] = {'$regex': f"^{location['state']}$", '$options': 'i'}
        colleges = list(colleges_collection.find(college_query))
        print(f"Colleges found after location/branch filter: {len(colleges)}")
        if not colleges:
            print("No colleges found for the given location/branch filter")

        recommended_colleges = []
        for college in colleges:
            print(f"\nChecking college: {college.get('collegeName')} (ID: {college.get('_id')})")
            # 3. Fetch full data for the college
            college_full = list(colleges_collection.aggregate([
                { '$match': { '_id': ObjectId(college['_id']) } },
                { '$lookup': {
                    'from': 'streams',
                    'localField': '_id',
                    'foreignField': 'collegeId',
                    'as': 'streams',
                    'pipeline': [
                        { '$lookup': {
                            'from': 'courses',
                            'localField': '_id',
                            'foreignField': 'streamId',
                            'as': 'courses',
                            'pipeline': [
                                { '$lookup': {
                                    'from': 'categories',
                                    'localField': '_id',
                                    'foreignField': 'courseId',
                                    'as': 'categories',
                                    'pipeline': [
                                        { '$project': {
                                            '_id': 1,
                                            'courseId': 1,
                                            'caste': 1,
                                            'gender': 1,
                                            'quotas': {
                                                '$map': {
                                                    'input': "$quotas",
                                                    'as': "quota",
                                                    'in': {
                                                        'quotaName': "$$quota.quotaName",
                                                        'data': { '$ifNull': ["$$quota.data", []] }
                                                    }
                                                }
                                            }
                                        }},
                                        { '$sort': { 'caste': 1, "quotas.quotaName": 1 } }
                                    ]
                                }},
                                { '$project': {
                                    '_id': 1,
                                    'streamId': 1,
                                    'branches': { '$ifNull': ['$branches', []] },
                                    'categories': { '$ifNull': ['$categories', []] }
                                }}
                            ]
                        }},
                        { '$project': {
                            '_id': 1,
                            'streamName': 1,
                            'streamType': 1,
                            'duration': 1,
                            'fees': 1,
                            'eligibilityCriteria': 1,
                            'requiredExams': 1,
                            'courses': { '$ifNull': ['$courses', []] }
                        }},
                        { '$sort': { 'streamName': 1 } }
                    ]
                }},
                { '$project': {
                    '_id': 1,
                    'collegeName': 1,
                    'address': 1,
                    'streams': 1
                }}
            ]))
            if not college_full:
                continue
            college_full = college_full[0]
            eligible = False
            eligible_options = []

            # Branch-based logic: if management, skip eligibility checks and just rank by priority
            if branch.strip().lower() == 'management':
                print("Management branch detected: skipping eligibility checks, ranking by priority only.")
                def calculate_score(college, priorities):
                    score = 0
                    score += float(college.get('teacherLeanerRatio', 0)) * priorities.get('teacherLeanerRatio', 0)
                    score += float(college.get('researchScore', 0)) * priorities.get('researchScore', 0)
                    score += float(college.get('graducationOutcome', 0)) * priorities.get('graducationOutcome', 0)
                    score += float(college.get('perceptionScore', 0)) * priorities.get('perceptionScore', 0)
                    score += float(college.get('campusLife', 0)) * priorities.get('campusLife', 0)
                    score += float(college.get('infrastructureScore', 0)) * priorities.get('infrastructureScore', 0)
                    score += float(college.get('alumniScore', 0)) * priorities.get('alumniScore', 0)
                    score += float(college.get('placementScore', 0)) * priorities.get('placementScore', 0)
                    return score
                college['score'] = calculate_score(college, priorities)
                for key, value in list(college.items()):
                    if isinstance(value, ObjectId):
                        college[key] = str(value)
                    elif isinstance(value, datetime):
                        del college[key]
                recommended_colleges.append({
                    'college': college,
                    'eligibleOptions': [{'eligible': True, 'reason': 'Management branch: all students eligible'}]
                })
                continue

            # 4. Go into desired course (from input)
            for stream in college_full.get('streams', []):
               # print(f"Full stream object: {stream}")  # Debug: print the entire stream object
                print(f"Checking stream: {stream.get('streamName')}")
                # Robustly fetch requiredExams from either top-level or eligibilityCriteria
                required_exams = stream.get('requiredExams')
                if required_exams is None:
                    eligibility_criteria = stream.get('eligibilityCriteria', {})
                    required_exams = eligibility_criteria.get('requiredExams', [])
                print(f"  Required exams for stream: {required_exams}")
                if isinstance(required_exams, str):
                    required_exams = [required_exams]
                print(f"  Student exams: {list(student_exams.keys())}")
                matching_exam = None
                student_exam_names = [e.strip().lower() for e in student_exams.keys()]
                for exam_name in required_exams:
                    print(f"    Checking if student has taken exam: {exam_name}")
                    if exam_name.strip().lower() in student_exam_names:
                        for k in student_exams:
                            if k.strip().lower() == exam_name.strip().lower():
                                matching_exam = student_exams[k]
                                print(f"      Match found: {exam_name}, student rank: {matching_exam.get('rank')}, year: {matching_exam.get('yearOfPassing')}")
                                break
                        break
                if not required_exams:
                    # No exam required for this stream, consider all students eligible for exam filter
                    matching_exam = {'rank': None, 'yearOfPassing': None}
                    print("    No required exams for this stream. Considering all students eligible for exam filter.")
                if not matching_exam:
                    print(f"    No matching exam found for this stream. Skipping.")
                    continue
                user_rank = matching_exam.get('rank')
                exam_year = matching_exam.get('yearOfPassing')
                for course_obj in stream.get('courses', []):
                    print(f"  Course branches: {course_obj.get('branches')} vs input: {course}")
                    if course_obj.get('streamId') != stream.get('_id'):
                        print(f"    Skipping: streamId mismatch {course_obj.get('streamId')} != {stream.get('_id')}")
                        continue
                    branches = course_obj.get('branches')
                    if branches:
                        if isinstance(branches, list):
                            if not any(course.lower() == b.lower() for b in branches):
                                print(f"    Skipping: course '{course}' not in branches {branches}")
                                continue
                        elif isinstance(branches, str):
                            if course.lower() != branches.lower():
                                print(f"    Skipping: course '{course}' != branch '{branches}'")
                                continue
                    for cat in course_obj.get('categories', []):
                        print(f"    Category caste: {cat.get('caste')} vs student caste: {student_caste}")
                        if cat.get('caste') != student_caste:
                            print(f"      Skipping: caste mismatch")
                            continue
                        cat_gender = cat.get('gender', 'Any')
                        print(f"      Category gender: {cat_gender} vs student gender: {student_gender}")
                        # Handle gender as list or string
                        if cat_gender != 'Any':
                            if isinstance(cat_gender, list):
                                if student_gender not in cat_gender:
                                    print(f"        Skipping: gender mismatch (student gender not in category gender list)")
                                    continue
                            else:
                                if cat_gender != student_gender:
                                    print(f"        Skipping: gender mismatch")
                                    continue
                        for quota_obj in cat.get('quotas', []):
                            quota_name = quota_obj.get('quotaName')
                            print(f"        Checking quota: {quota_name}")
                            if student_state and 'address' in college_full and 'state' in college_full['address']:
                                college_state = college_full['address']['state']
                                print(f"          Student state: {student_state}, College state: {college_state}")
                                if student_state.lower() == college_state.lower():
                                    if quota_name != 'HS':
                                        print(f"            Skipping: quota '{quota_name}' not HS for home state")
                                        continue
                                else:
                                    if quota_name not in ['AI', 'OS']:
                                        print(f"            Skipping: quota '{quota_name}' not AI/OS for other state")
                                        continue
                            closing_data = sorted(quota_obj.get('data', []), key=lambda d: d.get('year', 0), reverse=True)
                            print(f"          Closing data: {closing_data}")
                            if closing_data:
                                latest = closing_data[0]
                                closing_rank = latest.get('rank')
                                closing_year = latest.get('year')
                                print(f"            User rank/year: {user_rank}/{exam_year} vs closing: {closing_rank}/{closing_year}")
                                if closing_rank is not None and closing_year == exam_year:
                                    if user_rank is None or user_rank <= closing_rank:
                                        print(f"              Eligible: user rank {user_rank} <= closing rank {closing_rank}")
                                        eligible = True
                                        eligible_options.append({
                                            'category': cat.get('caste'),
                                            'gender': cat_gender,
                                            'quota': quota_name,
                                            'year': closing_year,
                                            'userRank': user_rank,
                                            'closingRank': closing_rank,
                                            'eligible': True
                                        })
                                    else:
                                        print(f"              Not eligible: user rank {user_rank} > closing rank {closing_rank}")
                                else:
                                    print(f"              Skipping: closing rank/year not matching or missing")
            if eligible:
                # Calculate score using priorities
                def calculate_score(college, priorities):
                    score = 0
                    score += float(college.get('teacherLeanerRatio', 0)) * priorities.get('teacherLeanerRatio', 0)
                    score += float(college.get('researchScore', 0)) * priorities.get('researchScore', 0)
                    score += float(college.get('graducationOutcome', 0)) * priorities.get('graducationOutcome', 0)
                    score += float(college.get('perceptionScore', 0)) * priorities.get('perceptionScore', 0)
                    score += float(college.get('campusLife', 0)) * priorities.get('campusLife', 0)
                    score += float(college.get('infrastructureScore', 0)) * priorities.get('infrastructureScore', 0)
                    score += float(college.get('alumniScore', 0)) * priorities.get('alumniScore', 0)
                    score += float(college.get('placementScore', 0)) * priorities.get('placementScore', 0)
                    return score
                college['score'] = calculate_score(college, priorities)
                for key, value in list(college.items()):
                    if isinstance(value, ObjectId):
                        college[key] = str(value)
                    elif isinstance(value, datetime):
                        del college[key]
                recommended_colleges.append({
                    'college': college,
                    
                })
        # Sort by score descending
        recommended_colleges = sorted(recommended_colleges, key=lambda x: x['college']['score'], reverse=True)
        return JSONResponse(content={'recommendations': recommended_colleges})
    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail='Server error.')
