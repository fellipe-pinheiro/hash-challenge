from os import getenv
from grpc import server
from concurrent import futures
from logging import getLogger

from controller.discount import DiscountService
from database.session import create_session
from config.logger import log_setup
from stub import user_pb2_grpc as pb2_grpc


def serve():
    log_setup()
    logger = getLogger()
    db_session = create_session()
    service_server = server(futures.ThreadPoolExecutor(max_workers=1))
    pb2_grpc.add_DiscountServicer_to_server(
        DiscountService(db_session), service_server)
    logger.info(f"Starting aplication [::]:{getenv('USER_API_PORT')}")
    service_server.add_insecure_port(f"[::]:{getenv('USER_API_PORT')}")
    service_server.start()
    service_server.wait_for_termination()


if __name__ == '__main__':
    serve()
