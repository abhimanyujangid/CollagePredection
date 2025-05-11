from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class StudentInterest(db.Model):
    __tablename__ = 'student_interests'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, nullable=False)
    interests = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<StudentInterest {self.student_id}: {self.interests}>'
    

from mongoengine import Document, StringField, DictField, FloatField

class College(Document):
    typeOfCollege = StringField(required=True)
    address = DictField()
    teacherLeanerRatio = FloatField()
    researchScore = FloatField()
    graducationOutcome = FloatField()
    perceptionScore = FloatField()
    campusLife = FloatField()
    infrastructureScore = FloatField()
    alumniScore = FloatField()
    placementStatistics = DictField()
    # Add other fields as needed    