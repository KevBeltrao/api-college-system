import {
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
} from './utils/userSchemas';

export default {
  '/users': {
    get: {
      tags: ['users'],
      summary: 'List users',
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'Users listed',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: userResponseSchema,
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['users'],
      summary: 'Create user',
      parameters: [
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: createUserSchema,
          },
        },
      ],
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'User created',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: userResponseSchema,
              },
            },
          },
        },
      },
    },
  },
  '/users/{userId}': {
    get: {
      tags: ['users'],
      summary: 'Detail user',
      security: [{ token: [] }],
      parameters: [
        {
          in: 'path',
          name: 'userId',
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
                properties: userResponseSchema,
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ['users'],
      summary: 'Update user',
      parameters: [
        {
          in: 'path',
          name: 'userId',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: updateUserSchema,
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
                properties: userResponseSchema,
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['users'],
      summary: 'Remove user',
      parameters: [
        {
          in: 'path',
          name: 'userId',
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
