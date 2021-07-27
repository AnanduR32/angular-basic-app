from flask.globals import request
from keycloak import KeycloakOpenID, exceptions
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from data import KEYCLOAK

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


# Configure client
keycloak_openid = KeycloakOpenID(
    server_url=KEYCLOAK['server_url'],
    client_id=KEYCLOAK['client_id'],
    realm_name=KEYCLOAK['realm_name'],
    client_secret_key=KEYCLOAK['client_secret_key']
)

# Home


@app.route('/')
def home():
    return("Home")


# Get Token
@app.route('/authenticate', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def authenticate():
    user = request.json.get('user')
    pswd = request.json.get('pswd')
    token = getToken(user, pswd)
    try:
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
        return(final_json, 200)
    except:
        final_json = {
            'code': 401,
            'status': 0,
            'content': "Unauthorized",
            'message': 'User is not authenticated'
        }
        return(final_json, 401)


def getTokenInfo(access_token):
    try:
        temp = keycloak_openid.introspect(access_token)
        return temp
    except:
        raise Exception('Failed to get token info')


def getToken(user, pswd):
    global token
    token = keycloak_openid.token(user, pswd)
    return(token)

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
#     header = response.headers
#     header['Access-Control-Allow-Origin'] = '*'
#     header['Access-Control-Allow-Headers'] = '*'
#     return response


user = 'user1'
pswd = 'admin1'
# token = getToken(user,pswd)
# print(token)
if(__name__ == '__main__'):
    app.run(debug=True, port='15681')
