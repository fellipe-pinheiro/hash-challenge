#!make
include .env
export $(shell sed 's/=.*//' .env)

db/up:
	docker-compose up -d database

db/down:
	docker-compose down

db/clear: db/down
	docker container prune -f && docker volume prune -f

product/migration: db/up
	sleep 3
	cd ./product_api && npx sequelize-cli db:migrate

product/dependencies:
	cd ./product_api && npm install -D

product/seeds: db/up product/migration
	cd ./product_api && npx sequelize-cli db:seed:all

product/proto:
	cd ./product_api  && \
	npx grpc_tools_node_protoc \
	--proto_path=./../pb \
	--js_out=import_style=commonjs,binary:./src/stub \
	--grpc_out=grpc_js:./src/stub \
	./../pb/user.proto

product/run: db/up
	cd ./product_api  && \
	node ./src/server.js

product/lint:
	cd ./product_api  && \
	npm run lint

product/cov:
	cd ./product_api  && \
	npm run cov

product/ci:
	make product/dependencies
	make product/proto
	make product/lint
	make product/cov

product/deploy:
	APP=product_api .deploy/trigger.sh

user/migration: db/up
	cd ./user_api  && \
	pipenv run alembic upgrade head

user/dependencies:
	cd ./user_api  && \
	pip install pipenv && \
	pipenv install -d

user/proto:
	cd ./user_api  && \
	pipenv run python -m grpc_tools.protoc \
	--proto_path=../pb \
	--python_out=./src/stub \
	--grpc_python_out=./src/stub \
	../pb/*.proto

user/run: db/up
	cd ./user_api  && \
	pipenv run python ./src/__main__.py

user/lint:
	cd ./user_api  && \
	pipenv run flake8 .

user/test:
	cd ./user_api  && \
	pipenv run pytest --pyargs tests -v --junitxml=results.xml  --cov-report xml --cov-report html

user/cov:
	cd ./user_api  && \
	pipenv run pytest --pyargs tests -v --cov-fail-under 100 --junitxml=results.xml  --cov-report xml --cov-report html

user/ci:
	make user/dependencies
	make user/proto
	make user/lint
	make user/cov

user/deploy:
	APP=user_api .deploy/trigger.sh

apps/dependencies: product/dependencies user/dependencies
	echo 'executed install dependencies'

apps/migrations: product/seeds user/migration
	echo 'executed migrations'

apps/cov: product/cov user/cov
	echo 'executed test coverage'

apps/proto: product/proto user/proto
	echo 'executed proto build'

apps/run:
	docker-compose up

apps/all/run:
	make apps/dependencies
	make apps/migrations
	make apps/proto
	make apps/run