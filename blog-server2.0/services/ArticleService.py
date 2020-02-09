from daos import DaoFactory, ArticleDao
from errors import TransactionExecuteError, ResourceNotFoundError

from functools import wraps
import types


def article_dao_register(f):

    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            dao = DaoFactory.createArticleDao()
            result = dao.executeTransaction(f, *args, **kwargs)
        except Exception as err:
            print(err)
            return {'message': err.message}, False
        return result, True

    return wrapper

@article_dao_register
def get_tags_all(dao):
    result = dao.get_tags_all()
    return result

@article_dao_register
def get_articles_list(dao, tag=None, limit=None, offset=None):
    result = dao.get_articles_list(tag, limit, offset)
    return result

@article_dao_register
def get_article_by_id(dao, id):
    result = dao.get_article_by_id(id)
    if result == None:
        print(result)
        raise ResourceNotFoundError
    return result

@article_dao_register
def get_article_summaries_list(dao, tag=None, limit=None, offset=None):
    result = dao.get_article_summaries_list(tag, limit, offset)
    return result

@article_dao_register
def create_article(dao, title, tags, summary, content):
    tags = list(map(str.strip, tags.split(',')))
    record_id = dao.create_article(title, tags, summary, content)
    if record_id == -1:
        raise TransactionExecuteError
    return {'message': f'create one article successfully'}

@article_dao_register
def update_article_by_id(dao, id, title, tags, summary, content):
    tags = list(map(str.strip, tags.split(',')))
    dao.update_article_by_id(id, title, tags, summary, content)
    return {'message': 'update article successfully'}

@article_dao_register
def delete_article(dao, id):
    result = dao.delete_article(id)
    if result == 0:
        raise TransactionExecuteError
    return {'message': f'delete {result} article successfully'}









