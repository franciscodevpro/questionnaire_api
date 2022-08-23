export const questionnaireDataPath = {
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to create a new questionnaire data',
    parameters: [{
      in: 'path',
      name: 'idQuestionnaire',
      required: true,
      schema: {
        type: 'string'
      }
    }],
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
      403: {
        $ref: '#/components/forbidden',
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
    parameters: [{
      in: 'path',
      name: 'idQuestionnaire',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/questionnaire',
              }
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  }
};

export const questionnaireDataDetailsPath = {
  put: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Questionnaire'],
    summary: 'API to update questionnaire data details',
    parameters: [{
      in: 'path',
      name: 'idQuestionnaire',
      required: true,
      schema: {
        type: 'string'
      }
    },
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
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
      403: {
        $ref: '#/components/forbidden',
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
    summary: 'API to get questionnaire data details',
    parameters: [{
      in: 'path',
      name: 'idQuestionnaire',
      required: true,
      schema: {
        type: 'string'
      }
    },
    {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/questionnaire',
              }
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  }
};