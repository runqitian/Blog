from flask import Flask
from flask_cors import CORS
from flask import request
import sys

from service import services

print(sys.executable)

app = Flask(__name__)
CORS(app)


@app.route('/blog/tags')
def getTags():
	return services.get_tags_all()

@app.route('/blog/blogs')
def getBlogsByCategoryPage():
	category = request.args.get('category')
	page_idx = 1
	if category == '':
		return services.get_blogs_page(page_idx)
	else:
		return services.get_blogs_by_category_page(category, page_idx)

@app.route('/blog/articles')
def getArticleById():
	id = request.args.get('id')
	return services.get_article_by_id(id)


@app.route('/admin/blog/update-article')
def updateArticleById():
	id = request.args.get('id')
	title = request.args.get('title')
	tags = request.args.get('tags')
	summary = request.args.get('summary')
	content = request.args.get('content')
	return {'success': services.update_article_by_id(id, title, tags, summary, content)}


@app.route('/admin/blog/insert-article')
def insertArticle():
	title = request.args.get('title')
	tags = request.args.get('tags')
	summary = request.args.get('summary')
	content = request.args.get('content')
	return {'success': services.insert_article(title, tags, summary, content)}


if __name__ == '__main__':
	app.run()

