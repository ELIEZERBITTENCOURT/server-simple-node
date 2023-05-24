import request from 'supertest';
import { listen } from './server';

let server;

beforeAll(async (done) => {
    server = listen(() => {
      console.log('Servidor rodando em http://localhost:3000');
      done();
    });
  });

afterAll((done) => {
  server.close(done);
});

describe('Teste das rotas de login e usuários', () => {
  it('Deve retornar sucesso ao fazer login como usuário normal', async () => {
    const response = await request(server)
      .post('/login/normal')
      .send({ username: 'user', password: 'password' });
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Login bem-sucedido para usuário normal.');
  });

  it('Deve retornar sucesso ao fazer login como usuário admin', async () => {
    const response = await request(server)
      .post('/login/admin')
      .send({ username: 'admin', password: 'password' });
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Login bem-sucedido para usuário admin.');
  });

  it('Deve retornar falha ao fazer login com credenciais inválidas', async () => {
    const response = await request(server)
      .post('/login/normal')
      .send({ username: 'user', password: 'wrongpassword' });
    
    expect(response.status).toBe(401);
    expect(response.text).toBe('Falha no login para usuário normal.');
  });

  it('Deve criar um novo usuário como admin', async () => {
    const response = await request(server)
      .post('/users')
      .send({ username: 'newuser', password: 'newpassword', isAdmin: true });
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Novo usuário criado com sucesso.');
  });

  it('Deve retornar erro ao criar novo usuário como usuário normal', async () => {
    const response = await request(server)
      .post('/users')
      .send({ username: 'newuser', password: 'newpassword', isAdmin: false });
    
    expect(response.status).toBe(403);
    expect(response.text).toBe('Apenas usuários admin podem criar novos usuários.');
  });

  it('Deve deletar um usuário existente como admin', async () => {
    const response = await request(server)
      .delete('/users/newuser');
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Usuário removido com sucesso.');
  });

  it('Deve retornar erro ao deletar usuário inexistente', async () => {
    const response = await request(server)
      .delete('/users/nonexistentuser');
    
    expect(response.status).toBe(404);
    expect(response.text).toBe('Usuário não encontrado.');
  });
});
