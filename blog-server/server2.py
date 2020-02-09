import sys
import jwt

from flask import Flask, request, make_response, jsonify, json
from flask_cors import CORS
from functools import wraps

from service import services

print(sys.executable)

app = Flask(__name__)
CORS(app)

# def token_required(f):

# 	@wraps
# 	def wrapper(*args, **kwargs):
# 		token = None
# 		if 'x-access-token' in request.headers:

# 		f(*args, **kwargs)
# 	return wrapper

'''
Tags section start
'''

@app.route('/blog/tags', method=['GET'])
def get_all_tags():
	success, result = services.get_tags_all()
	if success:
		return jsonify(result), 200
	return jsonify({'message': 'server error'}), 403

'''
Tags section end
'''


'''
Views section start
'''

@app.route('/blog/views/article-summaries', method=['GET'])
def get_views_all_article_summaries():
	category = request.args.get('category')
	limit = request.args.get('limit')
	offset = request.args.get('offset')
	limit = 20 if limit == None else limit
	offset = 0 if offset == None else offset
	if category == '' or category == None:
		success, result = services.get_views_article_summaries_part(limit, offset)
	else:
		success, result = services.get_views_article_summaries_by_category(category, limit, offset)
	if success:
		return jsonify(result), 200
	return jsonify({'message': 'server error'}), 403

'''
Views section start
'''


'''
Article section start
'''

# PATCH not implemented
# use /bulk/* if you want to post multiple articles

# @app.route('/blog/articles', method=['GET'])
# def get_all_articles():
# 	if id == None:
# 		services.get_all_articles
# 	else:


# 	id = request.args.get('id')
# 	return services.get_article_by_id(id)


@app.route('/blog/articles/<id>', method=['GET'])
def get_article_by_id(id):
	success, result = services.get_article_by_id(id)
	if success:
		return jsonify(result), 200
	return jsonify({'message': 'server error'}), 403


@app.route('/blog/article/<id>', method=['PUT'])
def updateArticleById(id):
	title = request.args.get('title')
	tags = request.args.get('tags')
	summary = request.args.get('summary')
	content = request.args.get('content')
	success = services.update_article_by_id(id, title, tags, summary, content)
	if success:
		return jsonify({'message': 'update success'}), 202
	return jsonify({'message': 'server error'}), 403

@app.route('/admin/blog/insert-article')
def insertArticle():
	title = request.args.get('title')
	tags = request.args.get('tags')
	summary = request.args.get('summary')
	content = request.args.get('content')
	return {'success': services.insert_article(title, tags, summary, content)}


@app.route('/admin/blog/delete-article')
def deleteArticle():
	id = request.args.get('id')
	result = services.delete_article(id)
	return {'success': result}

'''
Article section end
'''

# @app.route('/admin/login')
# def login():
# 	name = request.args.get('name')
# 	pwd = request.args.get('pwd')
# 	res = make_response("login finished, setting a cookie")
#     # res.set_cookie('foo', 'bar', max_age=60)
#     return res


@app.route('/test')
def test():
	return jsonify([{"success": "Trdafas"}])

if __name__ == '__main__':
	app.run(debug=True)

