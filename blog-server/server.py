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

article_test = '''
# MacDown

![MacDown logo](http://macdown.uranusjr.com/static/images/logo-160.png)

Hello there! I’m **MacDown**, the open source Markdown editor for OS X.

Let me introduce myself.



## Markdown and I

**Markdown** is a plain text formatting syntax created by John Gruber, aiming to provide a easy-to-read and feasible markup. The original Markdown syntax specification can be found [here](http://daringfireball.net/projects/markdown/syntax).

**MacDown** is created as a simple-to-use editor for Markdown documents. I render your Markdown contents real-time into HTML, and display them in a preview panel.
'''

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

@app.route('/articles')
def getArticleById():
	id = request.args.get('id')
	return {'title':'markdown', 'tags':['red'], 'content':article_test}



if __name__ == '__main__':
	app.run()

