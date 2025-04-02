from unittest import TestCase
from alchemy_mock.mocking import UnifiedAlchemyMagicMock
from mock import patch

from controller.discount import DiscountService
from models.discount import Discounts
from models.user import Users
from stub.user_pb2 import DiscountRequest


class ControllerDiscountTest(TestCase):

    def test_when_get_discount_with_none_user_then_return_zero_discount(self):
        discount_service = DiscountService(None)

        discount_value = discount_service._get_discount_by_user(None)

        self.assertEqual(discount_value, 0)

    @patch('controller.discount.date')
    def test_when_get_discount_with_birthday_user_then_return_5(self, mock_date):
        user_birthday = '2021-02-01'
        user = Users(id=10, first_name='elon', last_name='musk', date_of_birth=user_birthday)

        mock_date.today.return_value = user_birthday

        session = UnifiedAlchemyMagicMock()
        session.add(Discounts(id=1, name='birthday', date=user_birthday, value=5))

        discount_service = DiscountService(session)
        discount_value = discount_service._get_discount_by_user(user)

        self.assertEqual(discount_value, 5)

    @patch('controller.discount.date')
    def test_when_get_discount_in_black_friday_then_return_10(self, mock_date):
        black_friday = '2021-11-25'

        mock_date.today.return_value = None

        session = UnifiedAlchemyMagicMock()
        session.add(Discounts(id=1, name='black_friday', date=black_friday, value=10))

        user = Users(id=10, first_name='elon', last_name='musk', date_of_birth='2021-01-01')

        discount_service = DiscountService(session)
        discount_value = discount_service._get_discount_by_user(user)

        self.assertEqual(discount_value, 10)

    @patch('controller.discount.date')
    def test_when_get_discount_and_the_value_is_greater_than_10_then_return_below_10(self, mock_date):
        discount_date = '2021-11-25'

        mock_date.today.return_value = None

        session = UnifiedAlchemyMagicMock()
        session.add(Discounts(id=1, name='easter', date=discount_date, value=15))
        session.add(Discounts(id=1, name='saint_john', date=discount_date, value=8))

        user = Users(id=10, first_name='elon', last_name='musk', date_of_birth='2021-01-01')

        discount_service = DiscountService(session)
        discount_value = discount_service._get_discount_by_user(user)

        self.assertEqual(discount_value, 8)

    @patch('controller.discount.date')
    def test_when_get_discount_with_valid_user_then_return_discount_value(self, mock_date):
        discount_date = '2021-11-25'

        mock_date.today.return_value = None

        session = UnifiedAlchemyMagicMock()
        session.add(Users(id=10, first_name='elon', last_name='musk', date_of_birth='2021-01-01'))
        session.add(Discounts(id=1, name='saint_john', date=discount_date, value=9))

        request = DiscountRequest(userId='10', productId=None)

        discount_service = DiscountService(session)
        discount_response = discount_service.getDiscount(request, None)

        self.assertEqual(discount_response.percentage, 9)
