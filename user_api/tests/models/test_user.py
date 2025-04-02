from unittest import TestCase

from models.user import Users


class ModelUserTest(TestCase):

    def test_when_create_user_then_do_not_throw_error(self):
        user = Users()
        user.id = 123
        user.first_name = 'first'
        user.last_name = 'last'
        user.date_of_birth = '2021-02-28'

        self.assertEqual(str(user), '<User(id=123, first_name=first,last_name=last, date_of_birth=2021-02-28)>')
