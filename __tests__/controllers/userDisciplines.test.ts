import supertest from 'supertest';
import { ObjectID } from 'mongodb';
import faker from 'faker';
import { generate as generateCPF } from 'cpf';

import app from '../../src/config/app';

import UserDiscipline from '../../src/models/UserDiscipline';
import statusEnum from '../../src/models/utils/statusEnum';
import User from '../../src/models/User';
import Discipline from '../../src/models/Discipline';

import generateRandomNumber from '../../src/utils/generateRandomNumber';
import generateRegistration from '../../src/utils/generateRegistration';

const request = supertest(app);

const generateUserDiscipline = () => ({
  finalScore: generateRandomNumber(0, 10),
  semester: {
    year: generateRandomNumber(2015, 2020),
    unity: generateRandomNumber(1, 2),
  },
});

const generateUser = (isSuperUser: Boolean = false) => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: '123123',
  cpf: generateCPF(false),
  year: 2019,
  unity: 1,
  course: 'Sistemas de informação',
  role: isSuperUser ? 'admin' : 'student',
});

const loginAsSuperUser = async (email: string, password: string) => {
  const { body } = await request
    .post('/login')
    .send({ login: email, password });

  return body.data.token;
};

describe('Test userDisciplines\' controllers', () => {
  type SuperUserType = {
    _id: string;
    email: string;
    token: string;
  }
  const superUserInfo = {} as SuperUserType;

  beforeAll(async () => {
    const newSuperUserInfo = {
      ...generateUser(true),
      registration: generateRegistration(),
    };

    const superUser = await User.create(newSuperUserInfo);

    const { _id, email } = superUser;

    const token = await loginAsSuperUser(email, newSuperUserInfo.password);

    superUserInfo.email = email;
    superUserInfo._id = _id;
    superUserInfo.token = token;
  });

  afterAll(async () => User.findByIdAndDelete(superUserInfo._id));

  test('It should list userDisciplines', async () => {
    const { body, status } = await request
      .get('/user-disciplines')
      .set('authorization', `Bearer ${superUserInfo.token}`);
    const { data } = body;

    const [firstUserDiscipline] = data;

    expect(Array.isArray(data)).toBe(true);
    expect(status).toBe(200);
    expect(ObjectID.isValid(firstUserDiscipline.userId)).toBe(true);
    expect(ObjectID.isValid(firstUserDiscipline.disciplineId)).toBe(true);
    expect(typeof firstUserDiscipline.status).toBe('string');
    expect(statusEnum.includes(firstUserDiscipline.status)).toBe(true);
    expect(typeof firstUserDiscipline.finalScore).toBe('number');
    expect(typeof firstUserDiscipline.semester).toBe('object');
    expect(typeof firstUserDiscipline.semester.year).toBe('number');
    expect(typeof firstUserDiscipline.semester.unity).toBe('number');
  });
  test('It should create an userDiscipline', async () => {
    const [[firstUser], [firstDiscipline]] = await Promise.all([
      User.find(),
      Discipline.find(),
    ]);

    const newUserDisciplineInfo = {
      ...generateUserDiscipline(),
      userId: firstUser._id,
      disciplineId: firstDiscipline._id,
    };

    const { body, status } = await request
      .post('/user-disciplines').send(newUserDisciplineInfo)
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    await UserDiscipline.findByIdAndDelete(data._id);

    expect(status).toBe(201);
    expect(typeof data).toBe('object');
    expect(data.userId.toString()).toBe(newUserDisciplineInfo.userId.toString());
    expect(data.disciplineId.toString()).toBe(newUserDisciplineInfo.disciplineId.toString());
    expect(data.finalScore).toBe(newUserDisciplineInfo.finalScore);
    expect(typeof data.semester).toBe('object');
    expect(data.semester.year).toBe(newUserDisciplineInfo.semester.year);
    expect(data.semester.unity).toBe(newUserDisciplineInfo.semester.unity);
  });
  test('It should NOT create an userDiscipline (missing field)', async () => {
    const [, [firstDiscipline]] = await Promise.all([
      User.find(),
      Discipline.find(),
    ]);

    const newUserDisciplineInfo = {
      ...generateUserDiscipline(),
      disciplineId: firstDiscipline._id,
    };

    const { body, status } = await request
      .post('/user-disciplines')
      .send(newUserDisciplineInfo)
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    await UserDiscipline.findByIdAndDelete(data._id);

    expect(status).toBe(400);
  });
  test('It should detail an userDiscipline', async () => {
    const [[firstUser], [firstDiscipline]] = await Promise.all([
      User.find(),
      Discipline.find(),
    ]);

    const newUserDisciplineInfo = {
      ...generateUserDiscipline(),
      userId: firstUser._id,
      disciplineId: firstDiscipline._id,
    };

    const newUserDiscipline = await UserDiscipline.create(newUserDisciplineInfo);

    const { body, status } = await request
      .get(`/user-disciplines/${newUserDiscipline._id}`)
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    await UserDiscipline.findByIdAndDelete(data._id);

    expect(status).toBe(200);
    expect(typeof data).toBe('object');
    expect(data.userId.toString()).toBe(newUserDisciplineInfo.userId.toString());
    expect(data.disciplineId.toString()).toBe(newUserDisciplineInfo.disciplineId.toString());
    expect(data.finalScore).toBe(newUserDisciplineInfo.finalScore);
    expect(typeof data.semester).toBe('object');
    expect(data.semester.year).toBe(newUserDisciplineInfo.semester.year);
    expect(data.semester.unity).toBe(newUserDisciplineInfo.semester.unity);
  });
  test('It should NOT detail an userDiscipline (wrong id)', async () => {
    const { body, status } = await request
      .get('/user-disciplines/600566dca73e1f2b2cd112f3')
      .set('authorization', `Bearer ${superUserInfo.token}`);
    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(typeof data).toBe('string');
  });
  test('It should update an userDiscipline', async () => {
    const [[firstUser], [firstDiscipline]] = await Promise.all([
      User.find(),
      Discipline.find(),
    ]);

    const newUserDisciplineInfo = {
      ...generateUserDiscipline(),
      userId: firstUser._id,
      disciplineId: firstDiscipline._id,
    };

    const newUserDiscipline = await UserDiscipline.create(newUserDisciplineInfo);

    const newInfo = { finalScore: generateRandomNumber(0, 10) };

    const { body, status } = await request
      .patch(`/user-disciplines/${newUserDiscipline._id}`)
      .send(newInfo)
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    await UserDiscipline.findByIdAndDelete(data._id);

    expect(status).toBe(200);
    expect(typeof data).toBe('object');
    expect(data.userId.toString()).toBe(newUserDisciplineInfo.userId.toString());
    expect(data.disciplineId.toString()).toBe(newUserDisciplineInfo.disciplineId.toString());
    expect(data.finalScore).toBe(newInfo.finalScore);
    expect(typeof data.semester).toBe('object');
    expect(data.semester.year).toBe(newUserDisciplineInfo.semester.year);
    expect(data.semester.unity).toBe(newUserDisciplineInfo.semester.unity);
  });
  test('It should NOT update an userDiscipline (wrong id)', async () => {
    const newInfo = {
      finalScore: generateRandomNumber(0, 10),
    };

    const { body, status } = await request
      .patch('/user-disciplines/600566dca73e1f2b2cd112f3')
      .send(newInfo)
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(typeof data).toBe('string');
  });
  test('It should delete an userDiscipline', async () => {
    const [[firstUser], [firstDiscipline]] = await Promise.all([
      User.find(),
      Discipline.find(),
    ]);

    const newUserDisciplineInfo = {
      ...generateUserDiscipline(),
      userId: firstUser._id,
      disciplineId: firstDiscipline._id,
    };

    const newUserDiscipline = await UserDiscipline.create(newUserDisciplineInfo);

    const { body, status } = await request
      .delete(`/user-disciplines/${newUserDiscipline._id}`)
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('Deleted successfully');
  });
  test('It should NOT delete an userDiscipline (wrong id)', async () => {
    const { body, status } = await request
      .delete('/user-disciplines/600566dca73e1f2b2cd112f3')
      .set('authorization', `Bearer ${superUserInfo.token}`);

    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('UserDiscipline not found');
  });
});
