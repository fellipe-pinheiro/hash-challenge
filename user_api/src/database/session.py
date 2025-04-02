from os import getenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


def create_session():
    connection_string = get_connection_string()
    engine = create_engine(connection_string)
    Session = sessionmaker(bind=engine)
    return Session()


def get_connection_string():
    return f"postgresql://{getenv('POSTGRES_USER')}:{getenv('POSTGRES_PASSWORD')}@{getenv('POSTGRES_HOST')}/{getenv('POSTGRES_DB')}"
