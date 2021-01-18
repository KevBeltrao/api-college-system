import * as yup from 'yup';

import {
  name,
  name as professor,
  difficulty,
  schedule,
} from './utils/formats';

const userSchemaCreate = yup.object().shape({
  name,
  professor,
  difficulty,
  schedule,
});

export default {
  checkCreate: (body: object) => userSchemaCreate.validateSync(body),
};
