# Product API

Python gRPC API para retornar o desconto do usuario em cima do produto

- [x] Este serviço recebe um id de produto e um id de usuário e retorna um desconto

As regras de descontos da aplicação são:
- [x] Se for aniversário do usuário, o produto terá 5 % de desconto
- [x] Se for black friday(para esse teste você pode assumir que a data é 25 / 11) o produto terá 10 % de desconto
- [x] O desconto não pode passar de 10%

```
Serviço 1: Desconto invidual de produto
Este serviço recebe um id de produto e um id de usuário e retorna um desconto.
Produto exemplo:


{
    id: string
    price_in_cents: int
    title: string
    description: string
    discount: {
        percentage: float
        value_in_cents: int
    }
}
Usuário exemplo:

{
    id: string
    first_name: string
    last_name: string
    date_of_birth: Date
}
```

```sql
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL
)
CREATE TABLE IF NOT EXISTS discounts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    date DATE,
    value DECIMAL  NOT null
)

INSERT INTO public.users(first_name, last_name, date_of_birth) VALUES('Thor', 'Odinson', '2021-02-28')
INSERT INTO public.users(first_name, last_name, date_of_birth) VALUES('Loki', 'Odinson', NOW())


INSERT INTO public.discounts(name, date, value) VALUES('blackfriday', '2021-11-25', 5)
INSERT INTO public.discounts(name, date, value) VALUES('burning stock', NOW(), 10.5)
INSERT INTO public.discounts(name, date, value) VALUES('boss is crazy', NOW(), 8)
INSERT INTO public.discounts(name, date, value) VALUES('birthday', null, 10)

```

## Built With
- [python:3.9.2](https://www.python.org/downloads/release/python-392/)
- [protobuf](https://github.com/protocolbuffers/protobuf)
- [sqlalchemy](https://www.sqlalchemy.org/)
- [alembic](https://alembic.sqlalchemy.org/en/latest/)
- [pytest](https://docs.pytest.org/en/stable/)
- [flake8](https://flake8.pycqa.org/en/latest/)

## tasks
- [x] github
    - [x] main
- [x] docker
    - [x] slim
- [x] database
    - [x] docker image
    - [x] postgresql
- [x] logging
- [x] CI
    - [x] github actions
    - [x] lint
    - [x] unit test
    - [x] 100% coverage
    - [ ] integrated test
    - [ ] build image
- [x] CD
    - [x] deploy template
    - [x] script deploy
- [x] documentation
    - [x] architecture
- [ ] code quality 
    - [ ] sonarqube
