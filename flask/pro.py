
from flask import Flask,request,jsonify
import psycopg2
app = Flask(__name__)


def connect():
        return psycopg2.connect(user="postgres", password="Post@2021&", host="127.0.0.1", port="5432",database="postgres")


@app.route('/abc',methods=['POST'])
def abc():

    try:
            name=request.json['name']
            department=request.json['department']
            student_id=request.json['student_id']
            username=request.json['username']
            password=request.json['password']
            print(name)
            print(department)
            print(student_id)
            connection=connect()
            cursor = connection.cursor()
            cursor.execute('INSERT INTO people(name, department,student_id,username,password) values(%s,%s,%s.%s,%s)',(name,department,student_id,username,password))
            connection.commit()
            count=cursor.rowcount
            print(count,"Value inserted successfully into student table")
            return jsonify(message='Successfully added student details',status=200),200

    except (Exception, psycopg2.Error) as error:
        print ("Failed to insert value",error)
        return jsonify(message='Method not allowed',status=405),405


@app.route('/get',methods=['GET'])
def get():
        try:

                connection=connect()
                cursor = connection.cursor()
                cursor.execute("SELECT * FROM people")
                Student_details=cursor.fetchall()
                print(Student_details)
                return jsonify(Student_details),200

        except (Exception,psycopg2.Error)as error:
            print("Failed to obtain record from student",error)
            return jsonify(message='Method not allowed',status=405),405


@app.route('/getbyid',methods=['GET'])
def getbyid():
        try:
                student_id=request.args['student_id']
                connection=connect()
                cursor = connection.cursor()
                cursor.execute("SELECT * FROM people WHERE student_id=%s",(student_id))
                Student_details=cursor.fetchall()
                print(Student_details)
                return jsonify(Student_details),200

        except (Exception,psycopg2.Error)as error:
            print("Failed to obtain record from student",error)
            return jsonify(message='Method not allowed',status=405),405


@app.route('/auth',methods=['GET','POST'])
def auth():

        try:
                username=request.args['username']
                password=request.args['password']
                connection=connect()
                cursor = connection.cursor()
                cursor.execute("SELECT EXISTS (SELECT * FROM people WHERE username = %s AND password = %s)",(username, password))
                print("works")
                Student_details=cursor.fetchall()
                #Student_details= Student_details
                print(Student_details)
                return jsonify(Student_details)

        except (Exception,psycopg2.Error)as error:
            print("Failed to obtain record from student",error)
            return jsonify(message='Method not allowed',status=405),405


@app.route('/userdetails',methods=['GET','POST'])
def userdetails():
        try:
                username=request.args['username']
                password=request.args['password']
                connection=connect()
                cursor = connection.cursor()
                cursor.execute("SELECT name, department, student_id FROM people WHERE username = %s AND password = %s",(username, password))
                Student_details = cursor.fetchall()
                print(Student_details)
                return jsonify(Student_details),200

        except (Exception,psycopg2.Error)as error:
            print("Failed to obtain record from student",error)
            return jsonify(message='Method not allowed',status=405),405






if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)


