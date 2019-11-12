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
