const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Arrays para armazenar usuários normais e usuários admin
const normalUsers = [];
const adminUsers = [];

// Configurando o body-parser para receber dados JSON
app.use(bodyParser.json());

// Rota de login para usuário normal
app.post('/login/normal', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe no array de usuários normais
    const user = normalUsers.find(u => u.username === username && u.password === password);

    if (user) {
        res.send('Login bem-sucedido para usuário normal.');
    } else {
        res.status(401).send('Falha no login para usuário normal.');
    }
});

// Rota de login para usuário admin
app.post('/login/admin', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe no array de usuários admin
    const user = adminUsers.find(u => u.username === username && u.password === password);

    if (user) {
        res.send('Login bem-sucedido para usuário admin.');
    } else {
        res.status(401).send('Falha no login para usuário admin.');
    }
});

// Rota para criar novo usuário (disponível apenas para usuários admin)
app.post('/users', (req, res) => {
    const { username, password, isAdmin } = req.body;

    // Verifica se o usuário que está fazendo a requisição é admin
    if (!req.isAdmin) {
        res.status(403).send('Apenas usuários admin podem criar novos usuários.');
        return;
    }

    // Cria um novo usuário com base nos dados enviados
    const newUser = { username, password, isAdmin };

    // Adiciona o novo usuário ao array apropriado
    if (isAdmin) {
        adminUsers.push(newUser);
    } else {
        normalUsers.push(newUser);
    }

    res.send('Novo usuário criado com sucesso.');
});

// Rota para deletar um usuário (disponível apenas para usuários admin)
app.delete('/users/:username', (req, res) => {
    const { username } = req.params;

    // Verifica se o usuário que está fazendo a requisição é admin
    if (!req.isAdmin) {
        res.status(403).send('Apenas usuários admin podem deletar usuários.');
        return;
    }

    // Remove o usuário do array apropriado
    const userIndex = adminUsers.findIndex(u => u.username === username);
    if (userIndex !== -1) {
        adminUsers.splice(userIndex, 1);
        res.send('Usuário removido com sucesso.');
    } else {
        res.status(404).send('Usuário não encontrado.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
