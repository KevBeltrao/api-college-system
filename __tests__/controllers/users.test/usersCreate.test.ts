import supertest from 'supertest';

import app from '../../../src/config/app';

const request = supertest(app);

describe('Test users\' controllers', () => {
  test('It should respond the GET method', async () => {
    const newUser = {
      email: 'example@mail.com',
      password: '123123',
      name: 'Example',
      role: '',
      // semester,
    };

    const response = await request.get('/');

    expect(response.status).toBe(200);
  });
});
