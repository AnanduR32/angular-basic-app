from flask.globals import request
from keycloak import KeycloakOpenID, exceptions
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Configure client
keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
                                 client_id="school-client",
                                 realm_name="school",
                                 client_secret_key="3957ff87-e2ba-4f9c-a79e-a9f79f97c3a7")

# Home


@app.route('/')
def home():
    return("Home")


# Get Token
@app.route('/authenticate', methods=['GET', 'POST'])
def authenticate():
    user = request.json.get('user')
    pswd = request.json.get('pswd')
    token, status = getToken(user, pswd)
    if(status == 1):
        token_info = getTokenInfo(token['access_token'])
        content_json = {
            'username': user,
            'token': token['access_token'],
            'role': token_info['realm_access']['roles']}
        final_json = {
            'code': 200,
            'status': 1,
            'content': content_json,
            'message': 'User is authenticated and authorized'
        }
        code = 200
        # return(final_json, 200)
    else:
        final_json = {
            'code': 401,
            'status': 0,
            'content': "Unauthorized",
            'message': 'User is not authenticated'
        }
        code = 200
    return(final_json, code)


def getTokenInfo(access_token):
    try:
        temp = keycloak_openid.introspect(access_token)
        return temp
    except:
        raise Exception('Failed to get token info')


def getToken(user, pswd):
    global token
    try:
        token = keycloak_openid.token(user, pswd)
        tmp = token
        status = 1
    except exceptions.KeycloakAuthenticationError as e:
        tmp = []
        status = 0
    return(tmp, status)

# Get Userinfo


@app.route('/getUserInfo', methods=['GET', 'POST'])
def getUserInfo():
    try:
        userinfo = keycloak_openid.userinfo(token['access_token'])
        return(userinfo)
    except:
        return("Failure!")

# Refresh token


@app.route('/refresh', methods=['GET', 'POST'])
def refresh():
    global token
    tmp = keycloak_openid.refresh_token(token['refresh_token'])
    token = tmp
    return(token)

# Logout


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    try:
        keycloak_openid.logout(token['refresh_token'])
        return('Success!')
    except:
        return('Failure!')

# @app.after_request
# def after_request(response):
#     return(jsonify(response))


user = 'user1'
pswd = 'admin1'
# token = getToken(user,pswd)
# print(token)
if(__name__ == '__main__'):
    app.run(debug=True, port='15681')
