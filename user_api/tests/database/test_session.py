from unittest import TestCase
from mock import patch

from database import session


class SessionTest(TestCase):

    @patch('database.session.getenv')
    def test_when_get_connection_string_then_return_correct_string(self, mock_getenv):
        mock_getenv.side_effect = ['a', 'b', 'c', 'd']
        connection_string = session.get_connection_string()

        self.assertEqual(connection_string, 'postgresql://a:b@c/d')

    @patch('database.session.getenv')
    def test_when_get_session_then_return_not_none(self, mock_getenv):
        mock_getenv.side_effect = ['a', 'b', 'c', 'd']
        db_session = session.create_session()

        self.assertIsNotNone(db_session)
