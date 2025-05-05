# Flask API Project

This project is a Flask-based API designed to handle requests from a React frontend for student interest fields. It provides endpoints to fetch and submit data related to student interests.

## Project Structure

```
flask-api-project
├── app
│   ├── __init__.py        # Initializes the Flask application
│   ├── routes.py          # Defines API endpoints
│   ├── models.py          # Contains data models
│   └── utils.py           # Utility functions
├── static                 # Static files (CSS, JS, images)
├── templates              # HTML templates for server-side rendering
├── requirements.txt       # Project dependencies
├── config.py              # Configuration settings
├── run.py                 # Entry point to run the application
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flask-api-project
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Configure the application:**
   Update the `config.py` file with your database connection details and any other necessary configuration.

5. **Run the application:**
   ```
   python run.py
   ```

## Usage

- The API provides endpoints to interact with student interest data. You can use tools like Postman or your React frontend to make requests to these endpoints.
- Refer to the `routes.py` file for a list of available endpoints and their usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.