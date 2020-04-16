import sys
import jwt
import time
import os
if os.getenv('DB_USER') == None:
    os.environ["DB_USER"] = 'root'
if os.getenv('DB_PASSWORD') == None:
    os.environ['DB_PASSWORD'] = 'trq371402'
if os.getenv('DB_HOST') == None:
    os.environ['DB_HOST'] = 'blog_db'
if os.getenv('DB_NAME') == None:
    os.environ['DB_NAME'] = 'blog'


from flask import Flask, request, make_response, jsonify, json
from flask_cors import CORS
from functools import wraps

from daos import DaoFactory
DaoFactory.setup_db_connection()

import services

print(sys.executable)

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'this is a secret'

def token_required(f):

	@wraps(f)
	def wrapper(*args, **kwargs):
		token = None
		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		print(token)
		if not token:
			return jsonify({'message': 'token is required'}), 401
		try:
			data = jwt.decode(token, app.config['SECRET_KEY'])
			username = data['username']
		except:
			return jsonify({'message': 'token is invalid'}), 401

		result = f(*args, **kwargs)
		return result

	return wrapper



'''
Article section start
'''

@app.route('/api/blog/tags', methods=['GET'])
def get_all_tags():
	result, success = services.get_tags_all()
	if success:
		return jsonify(result), 200
	return jsonify(result), 404


@app.route('/api/blog/articles', methods=['GET'])
def get_articles_collection():
	tag = request.args.get('tag')
	limit = request.args.get('limit')
	offset = request.args.get('offset')
	result, success = services.get_articles_list(tag)
	if success:
		return jsonify(result), 200
	return jsonify(result), 404

@app.route('/api/blog/articles', methods=['POST'])
@token_required
def opt_articles_collection():
	req_data = request.get_json()
	result, success = services.create_article(req_data['title'], req_data['tags'], req_data['summary'], req_data['content'])
	if success:
		return jsonify(result), 201
	return jsonify(result), 400


@app.route('/api/blog/article/<id>', methods=['GET'])
def get_article_by_id(id):
	result, success = services.get_article_by_id(id)
	if success:
		return jsonify(result), 200
	return jsonify(result), 404


@app.route('/api/blog/article/<id>', methods=['PUT', 'DELETE'])
@token_required
def opt_article_by_id(id):
	if request.method == 'PUT':
		req_data = request.get_json()
		print(req_data)
		result, success = services.update_article_by_id(id, req_data['title'], req_data['tags'], req_data['summary'], req_data['content'])
		if success:
			return jsonify(result), 201
		return jsonify(result), 400
	elif request.method == 'DELETE':
		result, success = services.delete_article(id)
		if success:
			return jsonify(result), 200
		return jsonify(result), 400


@app.route('/api/blog/views', methods=['GET'])
def views_collection():
	tag = request.args.get('tag')
	limit = request.args.get('limit')
	offset = request.args.get('offset')
	result, success = services.get_article_summaries_list(tag, limit, offset)
	if success:
		return jsonify(result), 200
	return jsonify(result), 404

'''
Article section end
'''

@app.route('/api/blog/authstate', methods=['GET'])
def token_check():
	# time.sleep(5)
	token = None
	if 'x-access-token' in request.headers:
		token = request.headers['x-access-token']
	if not token:
		return jsonify({'message': 'token is required'}), 401
	try:
		data = jwt.decode(token, app.config['SECRET_KEY'])
		username = data['username']
	except:
		return jsonify({'message': 'token is invalid'}), 401

	result = {'message': 'token valid'}
	return jsonify(result), 200


@app.route('/api/blog/login', methods=['POST'])
def login():
	username = request.form.get('username')
	password = request.form.get('password')
	print(username)
	print(password)

	result, success = services.login(username, password, app.config['SECRET_KEY'])
	if success:
		return result, 200
	return {'message': 'login failed'}, 401

	# auth = request.authorization
	# print(auth)
	# if auth:
	# 	username = auth.username
	# 	password = auth.password
	# else:
	# 	return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
	# result, success = services.login(username, password, app.config['SECRET_KEY'])
	# if success:
	# 	return result, 200
	# print(result)
	# return make_response('Could not verify', 400)



if __name__ == '__main__':
	app.run(host='0.0.0.0')
