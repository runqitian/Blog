class ConnectionNotAvailableError(Exception):
	def __init__(self):
		self.message = 'database connection not available'

	def __str__(self):
		return f'Error:\t{self.message}'


class TransactionExecuteError(Exception):
	def __init__(self):
		self.message = 'transaction execution error'

	def __str__(self):
		return f'Error:\t{self.message}'


class ResourceNotFoundError(Exception):
    def __init__(self):
        self.message = 'resource not found'

    def __str__(self):
        return f'Error:\t{self.message}'