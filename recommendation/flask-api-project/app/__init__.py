from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)
'''from mongoengine import connect

# Example connection (update with your actual MongoDB URI and database name)
connect(
    db='collegePredection',
    host="mongodb+srv://abhimanyujangid79:collegePrediction@cluster0.5us5i.mongodb.net"
)'''

from recommendation.main import routes