from os import read
from flask import Flask,  request, jsonify
from data import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import exists
from dataclasses import dataclass
from datetime import datetime
from functools import cache, lru_cache
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)


@dataclass(order=True)
class StudentInfo(db.Model):
    __tablename__ = 'student_info'
    _id = db.Column(db.Integer(), primary_key=True)
    _name = db.Column(db.String())
    department = db.Column(db.String())
    dob = db.Column(db.Date())
    userid = db.Column(db.String())


@dataclass(order=True)
class Auth(db.Model):
    __tablename__ = 'auth_info'
    _id = db.Column(db.Integer(), primary_key=True)
    pswd = db.Column(db.String())


@app.route('/')
def home():
    return 'Suggest API Home'


@cache
@app.route('/api/v1/fetchStudents', methods=['GET'])
def fetchStudents():
    students = StudentInfo.query.all()
    results = [
        {
            "id": student.userid,
            "name": student._name,
            "department": student.department
        } for student in students
    ]
    return {"count": len(results), "Students": results}


@lru_cache
@app.route('/api/v1/fetchStudentById', methods=['GET', 'POST'])
def fetchStudentById():
    id = request.json.get('id')[4:]
    print('ID is : '+id)
    student = StudentInfo.query.get_or_404(id)
    response = {
        "id": student._id,
        "name": student._name,
        "department": student.department
    }
    return response


@app.route('/api/v1/enrollStudent', methods=['GET', 'POST'])
def enrollStudent():
    data = request.args
    new_student = StudentInfo(
        _id=data['id'], _name=data['name'], department=data['department'],
        dob=datetime.strptime(data['dob'], '%d-%m-%Y')
    )
    try:
        db.session.add(new_student)
        db.session.commit()
        return {"Student ": new_student._name, "status": 'Added'}
    except Exception as e:
        return {"Student ": new_student._name, "status": 'Failed', "Error": e.args}


@app.route('/api/v1/unenrollStudent', methods=['GET', 'POST'])
def unenrollStudent():
    id = request.args['id']
    name = request.args['name']
    student = StudentInfo.query.get_or_404(id)
    try:
        db.session.delete(student)
        db.session.commit()
        return {"Student ": student._name, "status": 'Deleted'}
    except Exception as e:
        return {"Student ": student._name, "status": 'Failed'}


@app.route('/api/v1/auth', methods=['GET', 'POST'])
def auth():
    name = request.args['name']
    pswd = request.args['pswd']
    try:
        id = db.session.query(StudentInfo).filter_by(_name=name).first()._id
        response = db.session.query(Auth).filter(
            Auth._id == id, Auth.pswd == pswd).count()
        if(response != 0):
            return jsonify(True, id)
        else:
            return jsonify(False)
    except Exception as e:
        return({"error": e.args})

# @app.after_request 
# def after_request(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     response.headers['Access-Control-Allow-Headers'] = '*'
#     return response

if __name__ == '__main__':
    app.run(debug=True, port='15680')
