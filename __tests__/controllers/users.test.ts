import supertest from 'supertest';
import faker from 'faker';
import { generate as generateCPF } from 'cpf';

import app from '../../src/config/app';
import User from '../../src/models/User';

import generateRegistration from '../../src/utils/generateRegistration';

const request = supertest(app);

const generateUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: '123123',
  cpf: generateCPF(false),
  year: 2019,
  unity: 1,
  course: 'Sistemas de informação',
});

describe('Test users\' controllers', () => {
  test('It should list users', async () => {
    const { body, status } = await request.get('/users');
    const { data } = body;

    const [firstUser] = data;

    expect(Array.isArray(data)).toBe(true);
    expect(status).toBe(200);
    expect(typeof firstUser.name).toBe('string');
    expect(typeof firstUser.email).toBe('string');
    expect(typeof firstUser.cpf).toBe('string');
    expect(typeof firstUser.course).toBe('string');
    expect(typeof firstUser.firstSemester).toBe('object');
    expect(typeof firstUser.registration).toBe('string');
    expect(typeof firstUser.active).toBe('boolean');
  });
  test('It should create an user', async () => {
    const newUserInfo = generateUser();

    const { body, status } = await request.post('/users').send(newUserInfo);
    const { data } = body;

    await User.findByIdAndDelete(data._id);

    expect(status).toBe(201);
    expect(typeof data).toBe('object');
    expect(data.name).toBe(newUserInfo.name);
    expect(data.email).toBe(newUserInfo.email.toLowerCase());
    expect(data.cpf).toBe(newUserInfo.cpf);
    expect(data.course).toBe(newUserInfo.course);
    expect(typeof data.firstSemester).toBe('object');
    expect(typeof data.registration).toBe('string');
    expect(data.active).toBe(false);
  });
  test('It should NOT create an user (missing field)', async () => {
    const newUserInfo = generateUser();

    const { body, status } = await request.post('/users').send({
      ...newUserInfo,
      name: undefined,
    });
    const { data } = body;

    expect(data).toBe('Name field is required');

    expect(status).toBe(400);
  });
  test('It should detail an user', async () => {
    const [userExample] = await User.find();

    const { body, status } = await request.get(`/users/${userExample._id}`);
    const { data } = body;

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(typeof data.name).toBe('string');
    expect(typeof data.email).toBe('string');
    expect(typeof data.cpf).toBe('string');
    expect(typeof data.course).toBe('string');
    expect(typeof data.firstSemester).toBe('object');
    expect(typeof data.registration).toBe('string');
    expect(typeof data.active).toBe('boolean');
  });
  test('It should NOT detail an user (wrong id)', async () => {
    const { body, status } = await request.get('/users/600566dca73e1f2b2cd112f3');
    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('User not found');
  });
  test('It should update an user', async () => {
    const {
      name,
      email,
      password,
      cpf,
      course,
      ...firstSemester
    } = generateUser();

    const newUserInfo = {
      name,
      email,
      password,
      cpf,
      course,
      firstSemester,
      registration: generateRegistration(),
      active: false,
    };

    const newUser = await User.create(newUserInfo);

    const newInfo = {
      cpf: generateCPF(false),
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    const { body, status } = await request.patch(`/users/${newUser._id}`).send(newInfo);
    await User.findByIdAndDelete(newUser._id);

    const { data } = body;

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data.name).toBe(newInfo.name);
    expect(data.email).toBe(newInfo.email.toLowerCase());
    expect(data.cpf).toBe(newInfo.cpf);
    expect(data.course).toBe(newUserInfo.course);
    expect(typeof data.firstSemester).toBe('object');
    expect(typeof data.registration).toBe('string');
    expect(typeof data.active).toBe('boolean');
  });
  test('It should NOT update an user (wrong id)', async () => {
    const newInfo = {
      cpf: generateCPF(false),
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    const { body, status } = await request.patch('/users/600566dca73e1f2b2cd112f3').send(newInfo);

    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('User not found');
  });
  test('It should NOT update an user (invalid cpf)', async () => {
    const {
      name,
      email,
      password,
      cpf,
      course,
      ...firstSemester
    } = generateUser();

    const newUserInfo = {
      name,
      email,
      password,
      cpf,
      course,
      firstSemester,
      registration: generateRegistration(),
      active: false,
    };

    const newUser = await User.create(newUserInfo);

    const newInfo = {
      cpf: generateCPF(false, true),
      email: faker.internet.email(),
      name: faker.name.findName(),
    };

    const { body, status } = await request.patch(`/users/${newUser._id}`).send(newInfo);

    await User.findByIdAndDelete(newUser._id);

    const { data } = body;

    expect(status).toBe(400);
    expect(typeof body).toBe('object');
    expect(typeof data).toBe('string');
  });
  test('It should delete an user', async () => {
    const {
      name,
      email,
      password,
      cpf,
      course,
      ...firstSemester
    } = generateUser();

    const newUserInfo = {
      name,
      email,
      password,
      cpf,
      course,
      firstSemester,
      registration: generateRegistration(),
      active: false,
    };

    const newUser = await User.create(newUserInfo);

    const { body, status } = await request.delete(`/users/${newUser._id}`);
    const { data } = body;

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('Deleted successfully');
  });
  test('It should NOT delete an user (wrong id)', async () => {
    const { body, status } = await request.delete('/users/600566dca73e1f2b2cd112f3');
    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('User not found');
  });
});
