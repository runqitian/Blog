from .Base import DaoManager
import json

class UserDao(DaoManager):

    def __init__(self, conn):
        super().__init__(conn)

    def login_check(self, username, password):
        query = "select password from users where username=%s"
        self.cursor.execute(query, (username,))
        row = self.cursor.fetchone()
        if row == None:
            return False
        return row[0] == password

    def get_site_config(self):
        query = "select * from configs"
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        result = {}
        for row in rows:
            result[row[0]] = row[1]
        return result