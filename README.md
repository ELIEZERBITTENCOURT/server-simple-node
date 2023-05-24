# Node.js Login Server

Este é um exemplo de um servidor simples em Node.js com rotas de login para dois tipos de usuários: usuário normal e usuário admin. O servidor permite que os usuários façam login e, dependendo do tipo de usuário, tenham diferentes permissões.

## Funcionalidades

- Rota de login para usuário normal.
- Rota de login para usuário admin.
- Rota para criar novo usuário (disponível apenas para usuários admin).
- Rota para deletar um usuário (disponível apenas para usuários admin).

## Pré-requisitos

Certifique-se de ter o Node.js instalado em seu computador.

## Como executar o servidor

1. Clone este repositório.

2. Navegue até a pasta do projeto.

3. Instale as dependências: "npm install"

4. Inicie o servidor: "node server.js"

5. O servidor estará em execução em [http://localhost:3000].

## Rotas disponíveis

- **POST /login/normal**: Rota de login para usuário normal. Envie uma requisição POST com os campos "username" e "password" no corpo da requisição para fazer login como usuário normal.

- **POST /login/admin**: Rota de login para usuário admin. Envie uma requisição POST com os campos "username" e "password" no corpo da requisição para fazer login como usuário admin.

- **POST /users**: Rota para criar novo usuário (disponível apenas para usuários admin). Envie uma requisição POST com os campos "username", "password" e "isAdmin" no corpo da requisição para criar um novo usuário.

- **DELETE /users/:username**: Rota para deletar um usuário (disponível apenas para usuários admin). Envie uma requisição DELETE para /users/:username, onde ":username" é o nome de usuário do usuário que deseja deletar.

## Observações

Este é um exemplo simples e não inclui autenticação segura ou persistência de dados. É apenas um ponto de partida para entender como criar um servidor com diferentes rotas e permissões de acesso. Recomenda-se adicionar autenticação segura, como JWT (JSON Web Tokens), e armazenar os usuários em um banco de dados para um ambiente de produção.
