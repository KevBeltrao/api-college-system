import supertest from 'supertest';

import app from '../src/config/app';

const request = supertest(app);

describe('Test the app.ts', () => {
  test('It should respond the GET method', async () => {
    const response = await request.get('/');
    console.log('==============', process.env.MONGO_URI);
    expect(response.status).toBe(200);
  });
});
