FROM python:3.9.2-slim

WORKDIR /app
COPY . /app

RUN pip install pipenv
RUN pipenv install --system

EXPOSE 50051

CMD ["python", "src/__main__.py"]
