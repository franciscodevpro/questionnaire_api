export const questionnaireDataPath = {
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to create a new questionnaire data',
    parameters: [
      {
        in: 'query',
        name: 'idQuestionnaire',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/questionnaireDataParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/questionnaireData',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to list all questionnaire data',
    parameters: [
      {
        in: 'query',
        name: 'idQuestionnaire',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/questionnaireData',
              },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};

export const questionnaireDataDetailsPath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to get questionnaire data details',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/questionnaireData',
              },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  put: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to update questionnaire data details',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/questionnaireDataParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/questionnaireData',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  delete: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to get questionnaire data details',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      204: {
        description: 'Success',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
