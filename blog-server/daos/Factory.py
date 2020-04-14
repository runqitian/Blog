import mysql.connector.pooling as pooling
from functools import wraps
from errors import ConnectionNotAvailableError

from .ArticleDao import ArticleDao
from .UserDao import UserDao
from .Base import DaoManager
import os

class DaoFactory:

	user = os.getenv("DB_USER")
	pwd = os.getenv("DB_PASSWORD")
	host = os.getenv("DB_HOST")
	db = os.getenv("DB_NAME")
	result = []

	cnxpool = pooling.MySQLConnectionPool(pool_name='blogdbpool',
	    pool_size=5,
	    pool_reset_session=True,
	    user=user, password=pwd, host=host, database=db, use_pure=True)

	@classmethod
	def createDaoManager(cls):
		try:
			conn = cls.cnxpool.get_connection()
		except:
			raise ConnectionNotAvailableError
		return DaoManager(conn)

	@classmethod
	def createArticleDao(cls):
		try:
			conn = cls.cnxpool.get_connection()
		except:
			raise ConnectionNotAvailableError
		return ArticleDao(conn)

	@classmethod
	def createUserDao(cls):
		try:
			conn = cls.cnxpool.get_connection()
		except:
			raise ConnectionNotAvailableError
		return UserDao(conn)
