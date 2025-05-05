def validate_interest_fields(data):
    # Check if the required fields are present
    required_fields = ['Drawing', 'Dancing', 'Singing', 'Sports', 'Video Game', 'Acting', 
                       'Travelling', 'Gardening', 'Animals', 'Photography', 'Teaching', 
                       'Exercise', 'Coding', 'Electricity Components', 'Mechanic Parts', 
                       'Computer Parts', 'Researching', 'Architecture', 'Historic Collection', 
                       'Botany', 'Zoology', 'Physics', 'Accounting', 'Economics', 
                       'Sociology', 'Geography', 'Psycology', 'History', 'Science', 
                       'Bussiness Education', 'Chemistry', 'Mathematics', 'Biology', 
                       'Makeup', 'Designing', 'Content writing', 'Crafting', 'Literature', 
                       'Reading', 'Cartooning', 'Debating', 'Asrtology', 'Hindi', 
                       'French', 'English', 'Urdu', 'Other Language', 'Solving Puzzles', 
                       'Gymnastics', 'Yoga', 'Engeeniering', 'Doctor', 'Pharmisist', 
                       'Cycling', 'Knitting', 'Director', 'Journalism', 'Bussiness', 
                       'Listening Music']
    
    for field in required_fields:
        if field not in data:
            return False, f"Missing field: {field}"
    
    return True, "All required fields are present"

def format_response(data):
    # Format the response data for consistency
    return {
        "status": "success",
        "data": data
    }