export const answerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    idQuestionnaireData: {
      type: 'string',
    },
    question: {
      $ref: '#/schemas/question',
    },
    answerOption: {
      $ref: '#/schemas/answerOption',
    },
    value: {
      type: 'string',
    },
    duration: {
      type: 'integer',
    },
    createdAt: {
      type: 'string',
    },
  },
  required: [
    'id',
    'idQuestionnaireData',
    'idQuestion',
    'idAnswerOption',
    'idDevice',
    'idApplier',
    'value',
    'duration',
    'createdAt',
  ],
};

export const answerCreationSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    idQuestionnaireData: {
      type: 'string',
    },
    idQuestion: {
      type: 'string',
    },
    idAnswerOption: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
    duration: {
      type: 'integer',
    },
    createdAt: {
      type: 'string',
    },
  },
  required: [
    'id',
    'idQuestionnaireData',
    'idQuestion',
    'idAnswerOption',
    'idDevice',
    'idApplier',
    'value',
    'duration',
    'createdAt',
  ],
};
