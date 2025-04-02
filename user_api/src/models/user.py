from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    date_of_birth = Column(Date)

    def __repr__(self):
        return f'<User(id={self.id}, first_name={self.first_name},last_name={self.last_name}, date_of_birth={self.date_of_birth})>'
