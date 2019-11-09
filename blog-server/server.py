from flask import Flask
from flask_cors import CORS
from flask import request
import sys
print(sys.executable)

app = Flask(__name__)
CORS(app)

unique_tags = ['math', 'story', 'news']

blogs_all  = [{'id':0, 'title':'test1', 'summary':'sum1', 'tags':['math', 'story']},
			{'id':1, 'title':'test2', 'summary':'sum2', 'tags':['story']},
			{'id':2, 'title':'test3', 'summary':'sum3', 'tags':['news', 'math']}
			]

@app.route('/tags')
def getTags():
	return {'content': unique_tags}

@app.route('/blogs')
def getBlogsByCategory():
	category = request.args.get('category')
	if category == '':
		return {'content': blogs_all}
	result = []
	for item in blogs_all:
		if category in item['tags']:
			result.append(item)
	return {'content': result}


if __name__ == '__main__':
	app.run()

