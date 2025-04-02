from sqlalchemy import Column, Integer, String, Date, Float
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Discounts(Base):
    __tablename__ = 'discounts'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    date = Column(Date)
    value = Column(Float)

    def __repr__(self):
        return f'<Discount(id={self.id}, name={self.name}, date={self.date}, value={self.value})>'
