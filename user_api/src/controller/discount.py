from datetime import date
from logging import getLogger

from stub import user_pb2_grpc as pb2_grpc
from stub import user_pb2 as pb2
from models.user import Users
from models.discount import Discounts

MAX_DISCOUNT_VALUE = 10.0

logger = getLogger()


class DiscountService(pb2_grpc.DiscountServicer):

    def __init__(self, db_session):
        self.db_session = db_session

    def getDiscount(self, discount_request, context):

        user = self.db_session.query(Users).filter_by(id=discount_request.userId).first()

        discount_value = self._get_discount_by_user(user)

        logger.info('getting user discount', extra={
            '_user_id': discount_request.userId,
            '_product_id': discount_request.productId,
            '_discount_value': discount_value
        })
        return pb2.DiscountResponse(percentage=discount_value)

    def _get_discount_by_user(self, user):
        discounts = []
        if not user:
            return 0

        if user.date_of_birth == date.today():
            discounts.append(self.db_session.query(Discounts).filter_by(name='birthday').first())

        for discount in self.db_session.query(Discounts).filter_by(date=date.today()):
            discounts.append(discount)

        discounts = [discount for discount in discounts if discount.value <= MAX_DISCOUNT_VALUE]
        discounts.sort(key=lambda discount: discount.value, reverse=True)
        return discounts[0].value if len(discounts) > 0 else 0
