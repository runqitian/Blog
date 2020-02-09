from daos import DaoFactory, UserDao

from datetime import datetime, timedelta

import jwt

def login(username, password, secret_key):
    try:
        dao = DaoFactory.createUserDao()
        result = dao.login_check(username, password)
    except Exception as err:
        print(err)
        result = False
        dao.rollbackTransaction()
    finally:
        dao.close()
    if result:
        return {'token':jwt.encode({'exp':datetime.timestamp(datetime.now() + timedelta(minutes=30)), 'username':username}, secret_key, algorithm='HS256').decode('utf8')}, True
    return {'message': 'login failed'}, False
