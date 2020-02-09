import mysql.connector.pooling as pooling
from functools import wraps

user = 'root'
pwd = 'trq371402'

def connect_database(user, pwd, host, db):
	cnxpool = pooling.MySQLConnectionPool(pool_name='blogdbpool',
                    pool_size=5,
                    pool_reset_session=True,
                    user=user, password=pwd, host=host, database=db, use_pure=True)
	# cnx = mysql.connector.connect(user=user, password=pwd, host=host, database=db, use_pure=True)
	return cnxpool;
cnxpool = connect_database(user, pwd, 'localhost', 'blog')


def db_connection_handle(f):

	@wraps(f)
	def wrapper(*args, **kwargs):
		# cnx = cnxpool.get_connection()
		# cursor = cnx.cursor()
		try:
			# result = f(cnx, cursor, *args, **kwargs)
			result = f(*args, **kwargs)
		except:
			raise
		finally:
			cursor.close()
			cnx.close()
		return result

	return wrapper


def dao_prepare():
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	return cnx, cursor


def dao_finish(cnx, cursor):
	cursor.close()
	cnx.close()

'''
Tags section start
'''

@db_connection_handle
def get_tags_all(cnx, cursor):
	result = []
	query = 'select tag from tags'
	cursor.execute(query)
	for (tag,) in cursor:
		result.append({'tag': tag})
	return result

@db_connection_handle
def insert_tags_ignore(cnx, cursor, tags):
	tags = [(item,) for item in tags]
	query = 'insert ignore into tags (tag) values(%s)'
	cursor.executemany(query, tags)
	result = cursor.rowcount
	cnx.commit()
	return result

@db_connection_handle
def clean_unused_tags(cnx, cursor):
	query = 'delete from tags where id not in (select distinct tag from tag_article)'
	cursor.execute(query)
	result = cursor.rowcount
	cnx.commit()
	return result

'''
Tags section end
'''


'''
Views section start
'''

@db_connection_handle
def get_views_article_summaries_all(cnx, cursor):
	query = 'select id, title, summary from articles'
	cursor.execute(query)
	result = []
	for (id, title, summary) in cursor:
		result.append({'id': id, 'title':title, 'summary':summary})
	return result

@db_connection_handle
def get_views_article_summaries_part(cnx, cursor, limit, offset):
	result = []
	query = 'select id, title, summary from articles limit {}, {}'.format(offset, limit)
	cursor.execute(query)
	for (id, title, summary) in cursor:
		result.append({'id': id, 'title':title, 'summary':summary})
	return result

@db_connection_handle
def get_views_article_summaries_by_category(cnx, cursor, category, limit, offset):
	result = []
	query = 'select articles.id, articles.title, articles.summary from articles inner join tag_article on articles.id = tag_article.article inner join (select id, tag from tags where tag=\'{}\') as cate on cate.id = tag_article.tag limit {},{}'.format(category, offset, limit)
	cursor.execute(query)
	result = []
	for (id, title, summary) in cursor:
		result.append({'id': id, 'title':title, 'summary':summary})
	return result

'''
Views section end
'''


'''
Article section start
'''

@db_connection_handle
def get_article_by_id(cnx, cursor, id):
	query = 'select r1.title, tags.tag, r1.summary, r1.content from (select id, title, summary, content from articles where id={}) as r1 inner join tag_article on r1.id=tag_article.article inner join tags on tags.id = tag_article.tag'.format(id)
	cursor.execute(query)
	tags = []
	for (title, tag, summary, content  ) in cursor:
		tags.append(tag)
	result = {'title': title, 'tags':tags, 'summary':summary, 'content':content}
	return result

@db_connection_handle
def insert_tag_article(cnx, cursor, tags, id):
	str_tags = ', '.join('"{}"'.format(each) for each in tags)
	query = 'delete from tag_article where article=%s'
	cursor.execute(query, (id,))
	# remove_count = cursor.rowcount
	query = 'insert ignore into tag_article select id,%s as "article" from tags where tag in (' + str_tags + ')'
	cursor.execute(query, (id,))
	# insert_count = cursor.rowcount
	cnx.commit()
	return

@db_connection_handle
def update_article_by_id(cnx, cursor, id, title, summary, content):
	query = 'update articles set title=%s, summary=%s, content=%s where id=%s'
	cursor.execute(query, (title, summary, content, id))
	result = cursor.rowcount
	cnx.commit()
	return result

@db_connection_handle
def insert_article(cnx, cursor, title, summary, content):
	query = 'insert into articles (title, summary, content) values (%s, %s, %s)'
	cursor.execute(query, (title, summary, content))
	record_id = -1
	if cursor.rowcount > 0:
		record_id = cursor.lastrowid
	cnx.commit()
	return record_id

@db_connection_handle
def delete_article(cnx, cursor, id):
	query = "delete from articles where id=%s"
	cursor.execute(query,(id,))
	result = cursor.rowcount
	query = "delete from tag_article where article=%s"
	cursor.execute(query,(id,))
	cnx.commit()
	return result

'''
Article section end
'''

