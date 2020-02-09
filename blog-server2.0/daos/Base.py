from errors import TransactionExecuteError

class DaoManager:

    def __init__(self, conn):
        self.conn = conn
        self.cursor = conn.cursor()

    def executeTransaction(self, fc, *args, **kwargs):
        try:
            result = fc(self, *args, **kwargs)
            self.commitTransaction()
        except Exception as err:
            self.rollbackTransaction()
            raise err
        finally:
            self.close()
        return result

    def commitTransaction(self):
        self.conn.commit()

    def rollbackTransaction(self):
        self.conn.rollback()

    def close(self):
        self.cursor.close()
        self.conn.close()
