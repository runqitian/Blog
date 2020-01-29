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
	query = 'select r1.title, tags.tag, r1.summary, r1.content from (select id, title, summary, content from articles where id={}) as r1 inner join tag_article on r1.id=tag_article.article inner join tags on tags.id = tag_article.tag'.format(id)
	cursor.execute(query)
	tags = []
	for (title, tag, summary, content  ) in cursor:
		tags.append(tag)
	result = {'title': title, 'tags':tags, 'summary':summary, 'content':content}
	cursor.close()
	cnx.close()
	return result

def insert_tags_ignore(tags):
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	tags = [(item,) for item in tags]
	query = 'insert ignore into tags (tag) values(%s)'
	cursor.executemany(query, tags)
	print('inserted {} rows.'.format(cursor.rowcount))
	cnx.commit()
	cursor.close()
	cnx.close()
	return

def insert_tag_article(tags, id):
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	str_tags = ', '.join('"{}"'.format(each) for each in tags)
	query = 'delete from tag_article where article=%s'
	cursor.execute(query, (id,))
	print('deleted {} rows.'.format(cursor.rowcount))
	query = 'insert ignore into tag_article select id,%s as "article" from tags where tag in (' + str_tags + ')'
	cursor.execute(query, (id,))
	print('inserted {} rows.'.format(cursor.rowcount))
	cnx.commit()
	cursor.close()
	cnx.close()
	return True

def clean_unused_tags():
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = 'delete from tags where id not in (select distinct tag from tag_article)'
	cursor.execute(query)
	print('deleted {} unused tags.'.format(cursor.rowcount))
	cnx.commit()
	cursor.close()
	cnx.close()
	return True

def update_article_by_id(id, title, summary, content):
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = 'update articles set title=%s, summary=%s, content=%s where id=%s'
	cursor.execute(query, (title, summary, content, id))
	print('updated {} rows.'.format(cursor.rowcount))
	cnx.commit()
	cursor.close()
	cnx.close()
	return True

def insert_article(title, summary, content):
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = 'insert into articles (title, summary, content) values (%s, %s, %s)'
	cursor.execute(query, (title, summary, content))
	print('inserted {} rows.'.format(cursor.rowcount))
	record_id = -1
	if cursor.rowcount > 0:
		record_id = cursor.lastrowid
	cnx.commit()
	cursor.close()
	cnx.close()
	return record_id

def delete_article(id):
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor()
	query = "delete from articles where id=%s"
	cursor.execute(query,(id,))
	result1 = cursor.rowcount
	print("deleted {} article".format(result1))
	query = "delete from tag_article where article=%s"
	cursor.execute(query,(id,))
	result2 = cursor.rowcount
	print("deleted {} tag_article".format(result2))
	cnx.commit()
	cursor.close()
	cnx.close()
	return result1>0;



