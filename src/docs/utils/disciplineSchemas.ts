export const createDisciplineSchema = {
  name: {
    type: 'string',
    example: 'Cálculo 1',
  },
  professor: {
    type: 'string',
    example: 'Augusto Matias',
  },
  difficulty: {
    type: 'number',
    example: 3,
  },
  schedule: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        startHourInMinutes: {
          type: 'number',
          example: 600,
        },
        endHourInMinutes: {
          type: 'number',
          example: 690,
        },
        day: {
          type: 'number',
          example: 1,
        },
      },
    },
  },
};

export const updateDisciplineSchema = createDisciplineSchema;

export const disciplineResponseSchema = {
  _id: {
    type: 'string',
    example: '6005df7a9ec2713f2c1cd41a',
  },
  ...createDisciplineSchema,
};
