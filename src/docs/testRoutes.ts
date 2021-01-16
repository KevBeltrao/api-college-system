export default {
  '/': {
    get: {
      tags: ['a'],
      summary: 'Test',
      parameters: [
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                example: 'example@gmail.com',
              },
              password: {
                type: 'string',
                example: '123456',
              },
            },
          },
        },
      ],
      // security: [{ token: [] }],
      responses: {
        200: {
          description: 'success',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'string',
                example: 'Pegou',
              },
            },
          },
        },
      },
    },
  },
};
