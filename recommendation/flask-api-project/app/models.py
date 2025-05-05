from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class StudentInterest(db.Model):
    __tablename__ = 'student_interests'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, nullable=False)
    interests = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<StudentInterest {self.student_id}: {self.interests}>'