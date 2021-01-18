import supertest from 'supertest';
import { ObjectID } from 'mongodb';

import app from '../../src/config/app';
import UserDiscipline from '../../src/models/UserDiscipline';
import generateRandomNumber from '../../src/utils/generateRandomNumber';

import statusEnum from '../../src/models/utils/statusEnum';
import User from '../../src/models/User';
import Discipline from '../../src/models/Discipline';

const request = supertest(app);

const generateUserDiscipline = () => ({
  finalScore: generateRandomNumber(0, 10),
  semester: {
    year: generateRandomNumber(2015, 2020),
    unity: generateRandomNumber(1, 2),
  },
});

describe('Test userDisciplines\' controllers', () => {
  test('It should list userDisciplines', async () => {
    const { body, status } = await request.get('/user-disciplines');
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

    const { body, status } = await request.post('/user-disciplines').send(newUserDisciplineInfo);
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

    const { body, status } = await request.post('/user-disciplines').send(newUserDisciplineInfo);
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

    const { body, status } = await request.get(`/user-disciplines/${newUserDiscipline._id}`);
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
    const { body, status } = await request.get('/user-disciplines/600566dca73e1f2b2cd112f3');
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
      .send(newInfo);

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
  test('It should NOT update an userDiscipline (wrong id)', async () => {
    const newInfo = {
      finalScore: generateRandomNumber(0, 10),
    };

    const { body, status } = await request.patch('/user-disciplines/600566dca73e1f2b2cd112f3').send(newInfo);

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

    const { body, status } = await request.delete(`/user-disciplines/${newUserDiscipline._id}`);
    const { data } = body;

    expect(status).toBe(200);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('Deleted successfully');
  });
  test('It should NOT delete an userDiscipline (wrong id)', async () => {
    const { body, status } = await request.delete('/user-disciplines/600566dca73e1f2b2cd112f3');
    const { data } = body;

    expect(status).toBe(404);
    expect(typeof body).toBe('object');
    expect(Array.isArray(body)).toBe(false);
    expect(data).toBe('UserDiscipline not found');
  });
});
