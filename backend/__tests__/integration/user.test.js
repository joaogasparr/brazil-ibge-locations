import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve ser permitido listar todos os usuários', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });

  it('Deve ser permitido listar um usuário específico', async () => {
    const { id } = await factory.create('User');

    const response = await request(app).get(`/users/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve ser verificado se o usuário existe na listagem específica', async () => {
    const id = 999999;

    const response = await request(app).get(`/users/${id}`);

    expect(response.status).toBe(400);
  });

  it('Deve ser permitido cadastrar novos usuários', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve ser verificado se o usuário a ser cadastrado já existe', async () => {
    await factory.create('User', { email: 'jest@jest.com.br' });

    const user = await factory.attrs('User', {
      email: 'jest@jest.com.br',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('Deve ser permitido alterar um usuário', async () => {
    const user = await factory.attrs('User');

    const { body } = await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .put(`/users/${body.id}`)
      .send({ ...user, email: 'jest@jest.com' });

    expect(response.status).toBe(200);
  });

  it('Deve ser verificado se o e-mail a ser atualizado já existe', async () => {
    const user = await factory.attrs('User');

    const { body } = await request(app)
      .post('/users')
      .send(user);

    await request(app)
      .post('/users')
      .send({ ...user, email: 'jest@jest.com' });

    const response = await request(app)
      .put(`/users/${body.id}`)
      .send({ ...user, email: 'jest@jest.com' });

    expect(response.status).toBe(400);
  });

  it('Deve ser permitido excluir um usuário', async () => {
    const { id } = await factory.create('User');

    const response = await request(app).delete(`/users/${id}`);

    expect(response.status).toBe(200);
  });
});
