import {
  createDisciplineSchema,
  updateDisciplineSchema,
  disciplineResponseSchema,
} from './utils/disciplineSchemas';

export default {
  '/disciplines': {
    get: {
      tags: ['disciplines'],
      summary: 'List disciplines',
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'Disciplines listed',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: disciplineResponseSchema,
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['disciplines'],
      summary: 'Create discipline',
      parameters: [
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: createDisciplineSchema,
          },
        },
      ],
      security: [{ token: [] }],
      responses: {
        200: {
          description: 'Discipline created',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: disciplineResponseSchema,
              },
            },
          },
        },
      },
    },
  },
  '/disciplines/{disciplineId}': {
    get: {
      tags: ['disciplines'],
      summary: 'Detail discipline',
      security: [{ token: [] }],
      parameters: [
        {
          in: 'path',
          name: 'disciplineId',
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
                properties: disciplineResponseSchema,
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ['disciplines'],
      summary: 'Update discipline',
      parameters: [
        {
          in: 'path',
          name: 'disciplineId',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: updateDisciplineSchema,
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
                properties: disciplineResponseSchema,
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ['disciplines'],
      summary: 'Remove discipline',
      parameters: [
        {
          in: 'path',
          name: 'disciplineId',
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
