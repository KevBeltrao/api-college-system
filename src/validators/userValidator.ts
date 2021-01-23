import * as yup from 'yup';

import {
  name,
  email,
  password,
  cpf,
  firstSemester,
  registration,
  course,
} from './utils/formats';

const userSchemaCreate = yup.object().shape({
  email,
  password,
  name,
  firstSemester,
  registration,
  course,
});

const userSchemaUpdate = yup.object().shape({
  name,
  email,
  cpf,
});

const superUserSchemaCreate = yup.object().shape({
  email,
  password,
  name,
  registration,
  course,
});

export default {
  checkCreate: (body: object) => userSchemaCreate.validateSync(body),
  checkUpdate: (body: object) => userSchemaUpdate.validateSync(body),
  checkSuperCreate: (body: object) => superUserSchemaCreate.validateSync(body),
};
