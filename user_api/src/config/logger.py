from os import getenv
from sys import stdout
from traceback import format_exc
from socket import gethostname
from json import dumps
from logging import getLogger, StreamHandler, Formatter


def log_setup():
    logger = getLogger()
    logger.setLevel(getenv('PRODUCT_API_LOG_LEVEL'))
    stdout_handler = StreamHandler(stdout)

    graylog_format = LoggerFormatter()
    stdout_handler.setFormatter(graylog_format)
    logger.addHandler(stdout_handler)


class LoggerFormatter(Formatter):

    def __init__(self):
        super().__init__()
        self._host = gethostname()

    def format(self, record):
        log = {
            'message': record.msg,
            'host': self._host,
            'level': record.levelname,
            'timestamp': record.created,
            '_application': 'user api',
            '_log_type': 'application',
        }

        if record.levelname == 'ERROR':
            log['_traceback'] = format_exc()

        for attr in vars(record):
            if attr[0] == '_':
                log[attr] = getattr(record, attr)

        return dumps(log)
