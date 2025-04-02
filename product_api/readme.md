# Product API

### API para retornar list de produtos e disconto que pode ser aplicado ao usuario

- [ ] Uma rota deve receber opcionalmente via header X-USER-ID um id de usuário
- [ ] Obter o desconto personalizado este serviço deve utilizar o serviço 1
- [ ] Caso o serviço 1 retorne um erro, a lista de produtos ainda precisa ser retornada, porém com esse produto que deu erro sem desconto
- [ ] Se o serviço de desconto (1) cair, o serviço de lista (2) tem que continuar funcionando e retornando a lista normalmente, só não vai aplicar os descontos


```
Serviço 2: Listagem de produtos

Expõe uma rota HTTP tal que GET /product retorne um json com uma lista de produtos.

Essa rota deve receber opcionalmente via header X-USER-ID um id de usuário.

Para obter o desconto personalizado este serviço deve utilizar o serviço 1.

Caso o serviço 1 retorne um erro, a lista de produtos ainda precisa ser retornada, porém com esse produto que deu erro sem desconto.

Se o serviço de desconto (1) cair, o serviço de lista (2) tem que continuar funcionando e retornando a lista normalmente, só não vai aplicar os descontos.
```
## Built With
- [node:14.15.5](https://nodejs.org/en/blog/release/v14.15.5/)
- [protobuf](https://github.com/protocolbuffers/protobuf)
- [expressjs](https://expressjs.com/pt-br/)
- [sequelize](https://sequelize.org/)
- [sequelize-cli](https://sequelize.org/master/manual/migrations.html)
- [eslint](https://eslint.org/)
- [mocha](https://mochajs.org/)
- [winston](https://www.npmjs.com/package/winston)

## tasks
- [x] github
    - [x] main
- [x] docker
    - [x] alpine
- [x] database
    - [xdocker image
    - [x] postgresql
- [x] logging
- [x] monitoring
    - [x] prometheus metrics
    - [x] health check
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
    - [x] swagger
- [ ] code quality 
    - [ ] sonarqube
