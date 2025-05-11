from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import os
import pandas as pd

router = APIRouter()

@router.post("/api/recommendations")
async def get_college_recommendations(request: Request):
    try:
        data = await request.json()
        branch = data.get('branch')
        course = data.get('course')
        location = data.get('location')
        priorities = data.get('priorities')

        if not branch or not course or not location or not priorities:
            raise HTTPException(status_code=400, detail='Missing required fields.')

        # Load CSV data
        csv_path = os.path.join(os.path.dirname(__file__), 'processed_Management.csv')
        df = pd.read_csv(csv_path)

        # Filter by branch (if you want to use branch, adapt as needed)
        # For now, we skip branch and course filtering since not in CSV

        # Filter by location
        if location != 'anywhere':
            if 'city' in location:
                df = df[df['city'].str.lower() == location['city'].lower()]
            if 'state' in location:
                df = df[df['state'].str.lower() == location['state'].lower()]

        # Scoring function
        def calculate_score(row, priorities):
            score = 0
            score += float(row.get('teacherLearnerRatio', 0)) * priorities.get('teacherLeanerRatio', 0)
            score += float(row.get('researchScore', 0)) * priorities.get('researchScore', 0)
            score += float(row.get('graducationOutcome', 0)) * priorities.get('graducationOutcome', 0)
            score += float(row.get('perceptionScore', 0)) * priorities.get('perceptionScore', 0)
            score += float(row.get('campusLife', 0)) * priorities.get('campusLife', 0)
            score += float(row.get('infrastructureScore', 0)) * priorities.get('infrastructureScore', 0)
            score += float(row.get('alumniScore', 0)) * priorities.get('alumniScore', 0)
            score += float(row.get('placementScore', 0)) * priorities.get('placementScore', 0)
            return score

        df['score'] = df.apply(lambda row: calculate_score(row, priorities), axis=1)
        recommendations = df.sort_values(by='score', ascending=False).to_dict(orient='records')

        return JSONResponse(content={'recommendations': recommendations})
    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail='Server error.')
