export const answerPath = {
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
      {
        basicAuth: [],
      },
    ],
    tags: ['Answer'],
    summary: 'API to create a answer to a question',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/answerParams',
          },
        },
      },
    },
    parameters: [
      {
        in: 'query',
        name: 'idQuestionnaireData',
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
              $ref: '#/schemas/answer',
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
      {
        basicAuth: [],
      },
    ],
    tags: ['Answer'],
    summary: 'API to get all answers of an applied questionnaire',
    parameters: [
      {
        in: 'query',
        name: 'idQuestionnaireData',
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
                $ref: '#/schemas/answer',
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

export const answerDetailsPath = {
  put: {
    security: [
      {
        apiKeyAuth: [],
      },
      {
        basicAuth: [],
      },
    ],
    tags: ['Answer'],
    summary: 'API to update an answer of question',
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
            $ref: '#/schemas/answerParams',
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
              type: 'array',
              items: {
                $ref: '#/schemas/answer',
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
  delete: {
    security: [
      {
        apiKeyAuth: [],
      },
      {
        basicAuth: [],
      },
    ],
    tags: ['Answer'],
    summary: 'API to delete an answer of question',
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
