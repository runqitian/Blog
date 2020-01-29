import sys
sys.path.append('..')

from repository import dao as dao

def get_tags_all():
	return {'content': dao.get_tags_all()}

def get_blogs_by_category_page(category, page_idx):
	return {'content': dao.get_blogs_by_category_page(category, page_idx)}

def get_blogs_page(page_idx):
	return {'content': dao.get_blogs_page(page_idx)}


def get_article_by_id(id):
	return {'content': dao.get_article_by_id(id)}

def update_article_by_id(id, title, tags, summary, content):
	tags = tags.split(',')
	dao.insert_tags_ignore(tags)
	if not dao.update_article_by_id(id, title, summary, content):
		return False
	if not dao.insert_tag_article(tags, id):
		return False
	dao.clean_unused_tags()
	return True

def insert_article(title, tags, summary, content):
	tags = tags.split(',')
	dao.insert_tags_ignore(tags)
	id = dao.insert_article(title, summary, content)
	if id == -1:
		return False
	if not dao.insert_tag_article(tags, id):
		return False
	return True