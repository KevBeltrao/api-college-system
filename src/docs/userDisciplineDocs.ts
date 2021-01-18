import {
  createUserDisciplineSchema,
  updateUserDisciplineSchema,
  userDisciplineResponseSchema,
} from './utils/userDisciplineSchemas';

export default {
  '/user-disciplines': {
    get: {
      tags: ['userDisciplines'],
      summary: 'List userDisciplines',
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'UserDisciplines listed',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: userDisciplineResponseSchema,
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['userDisciplines'],
      summary: 'Create userDiscipline',
      parameters: [
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: createUserDisciplineSchema,
          },
        },
      ],
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'UserDiscipline created',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: userDisciplineResponseSchema,
              },
            },
          },
        },
      },
    },
  },
  '/user-disciplines/{userDisciplineId}': {
    get: {
      tags: ['userDisciplines'],
      summary: 'Detail userDiscipline',
      security: [{ token: [] }],
      parameters: [
        {
          in: 'path',
          name: 'userDisciplineId',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        200: {
          description: 'success',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: userDisciplineResponseSchema,
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ['userDisciplines'],
      summary: 'Update userDiscipline',
      parameters: [
        {
          in: 'path',
          name: 'userDisciplineId',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: updateUserDisciplineSchema,
          },
        },
      ],
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'success',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: userDisciplineResponseSchema,
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['userDisciplines'],
      summary: 'Remove userDiscipline',
      parameters: [
        {
          in: 'path',
          name: 'userDisciplineId',
          required: true,
          type: 'string',
        },
      ],
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'success',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'string',
                example: 'Deleted successfully',
              },
            },
          },
        },
      },
    },
  },
};
