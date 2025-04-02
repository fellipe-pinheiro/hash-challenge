from unittest import TestCase

from models.discount import Discounts


class ModelDiscountTest(TestCase):

    def test_when_create_discount_then_do_not_throw_error(self):
        discount = Discounts()
        discount.id = 12
        discount.name = 'xpto'
        discount.date = '2021-02-28'
        discount.value = 10

        self.assertEqual(str(discount), '<Discount(id=12, name=xpto, date=2021-02-28, value=10)>')
