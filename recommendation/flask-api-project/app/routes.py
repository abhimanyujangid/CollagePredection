from flask import Blueprint, request, jsonify
from app.models import StudentInterest

api = Blueprint('api', __name__)

@api.route('/api/interests', methods=['GET'])
def get_interests():
    interests = StudentInterest.query.all()
    return jsonify([interest.to_dict() for interest in interests]), 200

@api.route('/api/interests', methods=['POST'])
def add_interest():
    data = request.get_json()
    new_interest = StudentInterest(**data)
    new_interest.save()
    return jsonify(new_interest.to_dict()), 201

@api.route('/api/interests/<int:id>', methods=['DELETE'])
def delete_interest(id):
    interest = StudentInterest.query.get_or_404(id)
    interest.delete()
    return jsonify({'message': 'Interest deleted successfully'}), 204