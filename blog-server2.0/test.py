# from daos import DaoFactory 
# import daos.repo as repo


# def fc(conn, cursor):
# 	return repo.get_tags_all(conn, cursor)

# try:
# 	manager = DaoFactory.createDaoManager()
# 	result = manager.executeTransaction(fc)

# except Exception as err:
# 	print(err.message)

# print(result)

# print(DaoFactory.val)
# DaoFactory.add()
# print(DaoFactory.val)
# DaoFactory.add()
# print(DaoFactory.val)

# from errors import ConnectionNotAvailableError

# print(ConnectionNotAvailableError)
# print(type(ConnectionNotAvailableError))
# print(ConnectionNotAvailableError())
# print(type(ConnectionNotAvailableError()))


'''
select r1.id, r1.title, tags.tag, r1.summary, r1.content from (select id, title, summary, content from articles) as r1 inner join tag_article on r1.id=tag_article.article inner join tags on tags.id = tag_article.tag

SELECT r1.id, r1.title, JSON_ARRAYAGG(tags.tag) AS tags, r1.summary, r1.content FROM (SELECT id, title, summary, content FROM articles) AS r1 INNER JOIN tag_article ON r1.id=tag_article.article INNER JOIN tags ON tags.id = tag_article.tag GROUP BY id
'''

# import services
# result = services.get_articles_list(tag='this "is ')
# print(result)

# import json
# print(json.dumps(json.dumps('this "is')))

# from functools import wraps

# def test_wraps(f):

# 	@wraps(f)
# 	def wrapper(*args, **kwargs):
# 		print(args)
# 		print(kwargs)
# 		f(102,*args[1:])
# 		return

# 	return wrapper

# @test_wraps
# def hello(x,y):
# 	print(x)
# 	print(y)
# 	return

# hello(10,29)

tags = ["   ths   ", "tgufdsa"]
print(', '.join(map(str.strip, tags)))

from types import MethodType

def hello(cls, a, b):
	print(a)
	print(b)







class A:
	def __init__(self):
		self.c = 10

	def reach(self):
		print(self.d)
		return

class B(A):
	def __init__(self):
		super().__init__()
		self.d = 100


# A.hello = classmethod(hello)

it = B()
it.reach()

# t = A()
# t.hello(1,2)





















