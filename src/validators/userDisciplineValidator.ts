import * as yup from 'yup';

import {
  objectId as userId,
  objectId as disciplineId,
  status,
  finalScore,
  firstSemester as semester,
} from './utils/formats';

const userDisciplineSchemaCreate = yup.object().shape({
  userId,
  disciplineId,
  status,
  finalScore,
  semester,
});

const userDisciplineSchemaUpdate = yup.object().shape({
  finalScore,
});

export default {
  checkCreate: (body: object) => userDisciplineSchemaCreate.validateSync(body),
  checkUpdate: (body: object) => userDisciplineSchemaUpdate.validateSync(body),
};
