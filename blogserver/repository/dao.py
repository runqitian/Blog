import mysql.connector.pooling as pooling
user = 'root'
pwd = 'trq371402'
page_size = 8

def connect_database(user, pwd, host, db):
	cnxpool = pooling.MySQLConnectionPool(pool_name='blogdbpool',
                    pool_size=5,
                    pool_reset_session=True,
                    user=user, password=pwd, host=host, database=db, use_pure=True)
	# cnx = mysql.connector.connect(user=user, password=pwd, host=host, database=db, use_pure=True)
	return cnxpool;
cnxpool = connect_database(user, pwd, 'localhost', 'blog')

def get_tags_all():
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = 'select tag from tags'
	cursor.execute(query)
	result = []
	for (tag,) in cursor:
		result.append(tag)
	cursor.close()
	cnx.close()
	return result

def get_blogs_page(page_idx):
	cnx = cnxpool.get_connection()
	start = (page_idx - 1) * page_size
	end = page_idx * page_size
	cursor = cnx.cursor()
	query = 'select id, title, summary from articles limit {}, {}'.format(start, end)
	cursor.execute(query)
	result = []
	for (id, title, summary) in cursor:
		result.append({'id': id, 'title':title, 'summary':summary})
	cursor.close()
	cnx.close()
	return result


def get_blogs_by_category_page(category, page_idx):
	cnx = cnxpool.get_connection()
	start = (page_idx - 1) * page_size
	end = page_idx * page_size
	cursor = cnx.cursor()
	query = 'select articles.id, articles.title, articles.summary from articles inner join tag_article on articles.id = tag_article.article inner join (select id, tag from tags where tag=\'{}\') as cate on cate.id = tag_article.tag limit {},{}'.format(category, start, end)
	cursor.execute(query)
	result = []
	for (id, title, summary) in cursor:
		result.append({'id': id, 'title':title, 'summary':summary})
	cursor.close()
	cnx.close()
	return result

def get_blogs_all():
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = 'select id, title, summary from articles'
	cursor.execute(query)
	result = []
	for (id, title, summary) in cursor:
		result.append({'id': id, 'title':title, 'summary':summary})
	cursor.close()
	cnx.close()
	return result

def get_article_by_id(id):
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = 'select r1.title, tags.tag, r1.content from (select id,title, content from articles where id={}) as r1 inner join tag_article on r1.id=tag_article.article inner join tags on tags.id = tag_article.tag'.format(id)
	cursor.execute(query)
	tags = []
	for (title, tag, content  ) in cursor:
		tags.append(tag)
	result = {'title': title, 'tags':tags, 'content':content}
	cursor.close()
	cnx.close()
	return result
