import * as yup from 'yup';

import {
  name,
  email,
  password,
  role,
  cpf,
  semester,
  registration,
} from './utils/formats';

const userSchemaCreate = yup.object().shape({
  email,
  password,
  name,
  role,
  semester,
  registration,
});

const userSchemaUpdate = yup.object().shape({
  name,
  email,
  cpf,
});

export default {
  checkCreate: (body: object) => userSchemaCreate.validateSync(body),
  checkUpdate: (body: any) => {
    if (body.email) {
      throw new Error('Email cannot be changed');
    }

    if (body.password) {
      throw new Error('Password reset has it\'s own endpoint');
    }

    return userSchemaUpdate.validateSync(body);
  },
};
