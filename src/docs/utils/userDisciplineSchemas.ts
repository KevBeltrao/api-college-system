import statusEnum from '@models/utils/statusEnum';

export const createUserDisciplineSchema = {
  userId: {
    type: 'string',
    example: '6005df7a9ec2713f2c1cd41a',
  },
  disciplineId: {
    type: 'string',
    example: '6005df7a9ec2713f2c1cd41a',
  },
  finalScore: {
    type: 'number',
    example: 8.5,
  },
  semester: {
    type: 'object',
    properties: {
      year: {
        type: 'number',
        example: 2019,
      },
      unity: {
        type: 'number',
        example: 1,
      },
    },
  },
};

const { finalScore } = createUserDisciplineSchema;

export const updateUserDisciplineSchema = { finalScore };

export const userDisciplineResponseSchema = {
  _id: {
    type: 'string',
    example: '6005df7a9ec2713f2c1cd41a',
  },
  ...createUserDisciplineSchema,
  status: {
    type: 'string',
    example: 'aprovado',
    enum: statusEnum.map((status) => status),
  },
};
