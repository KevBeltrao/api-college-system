import { number } from 'yup/lib/locale';

export const createUserSchema = {
  name: {
    type: 'string',
    example: 'Steve Jobs',
  },
  email: {
    type: 'string',
    example: 'example@gmail.com',
  },
  password: {
    type: 'string',
    example: '123456',
  },
  cpf: {
    type: 'string',
    example: '12345678901',
  },
  year: {
    type: 'number',
    example: 2019,
  },
  unity: {
    type: 'number',
    example: 1,
  },
  course: {
    type: 'string',
    example: 'Economia',
  },
};

const { name, email, cpf } = createUserSchema;

export const updateUserSchema = { name, email, cpf };

export const userResponseSchema = {
  _id: {
    type: 'string',
    example: '6005df7a9ec2713f2c1cd41a',
  },
  ...createUserSchema,
  registration: {
    type: 'string',
    example: 'b994079f-ea51-40bc-9804-1fc7720c280b',
  },
  active: {
    type: 'boolean',
    example: false,
  },
  firstSemester: {
    type: 'object',
    properties: {
      year: {
        type: number,
        example: 2019,
      },
      unity: {
        type: number,
        example: 1,
      },
    },
  },
};
