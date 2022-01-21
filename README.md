# qualicorp-backend-test

Projeto para a empresa Qualicorp, desenvolvido em `Javascript` com `Nodejs` e banco de dados `MongoDb`.

## Preparação

1. Alterar o arquivo `.env_info` para `.env`, onde costa as variáveis de ambiente, o jwt secret e os dados do banco já estão preenchidos, apenas a porta não, podendo ser ou não, caso o PORT esteja vazio irá automaticamente para 3000
2. Após instalar as dependências com `yarn` ou `npm install`, a api poderá ser iniciada com o comando `yarn start` ou `npm run start`.

## Endpoints
- `/user/login` - POST  - `email` e `password`
- `/user` - POST - `name`, `password` e `email`
- `/user` - GET
- `/user/:id` - GET