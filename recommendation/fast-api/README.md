# FastAPI Recommendation Project

This project is a FastAPI-based API designed to handle requests from a frontend for student interest fields and college recommendations. It provides endpoints to predict course categories using a machine learning model and to recommend colleges based on user input and database records.

## Project Structure

```
fast-api
├── app
│   ├── __init__.py
│   ├── recommendation_fastapi.py  # FastAPI router for recommendations
├── requirements.txt               # Project dependencies
├── run.py                        # Entry point to run the FastAPI application
├── README.md                     # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd fast-api
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Configure the application:**
   - Add your MongoDB connection string to the `.env` file as `MONGODB_URI=...` in the backend directory.
   - Ensure your model and dataset files are in the correct locations as referenced in `main.py`.

5. **Run the application:**
   ```
   uvicorn run:app --reload
   ```

## Usage

- The API provides endpoints for:
  - `/predict` : Predicting course category based on input features.
  - `/api/recommendations` : Recommending colleges based on user profile and preferences.
- You can use tools like Postman or your frontend to make requests to these endpoints.
- Refer to the `recommendation_fastapi.py` file for recommendation logic and endpoint details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.