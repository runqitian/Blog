import sys
sys.path.append('..')

from repository import dao as dao

def get_tags_all():
	try:
		result = dao.get_tags_all()
	except:
		return False, None
	return True, result

def get_views_article_summaries_by_category(category, limit, offset):
	try:
		result = dao.get_views_article_summaries_by_category(category, limit, offset)
	except:
		return False, None
	return True, result

def get_views_article_summaries_part(limit, offset):
	try:
		result = dao.get_views_article_summaries_part(limit, offset)
	except:
		return False, None
	return True, result

def get_article_by_id(id):
	try:
		result = dao.get_article_by_id(id)
	except:
		return False, None
	return True, result

def update_article_by_id(id, title, tags, summary, content):
	tags = tags.split(',')
	try:
		dao.insert_tags_ignore(tags)
		dao.update_article_by_id(id, title, summary, content):
		dao.insert_tag_article(tags, id)
		dao.clean_unused_tags()
	except:
		return False
	return True

def insert_article(title, tags, summary, content):
	tags = tags.split(',')
	try:
		dao.insert_tags_ignore(tags)
		id = dao.insert_article(title, summary, content)
		if id == -1:
			return False, -1
		dao.insert_tag_article(tags, id):
	except:
		return False, -1
	return True, id 

def delete_article(id):
	try:
		dao.delete_article(id)
		dao.clean_unused_tags()
	except:
		return False
	return True