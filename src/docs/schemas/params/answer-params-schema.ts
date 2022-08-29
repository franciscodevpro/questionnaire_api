export const answerParamsSchema = {
  type: 'object',
  properties: {
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
    'idSession',
    'idQuestion',
    'idAnswerOption',
    'idDevice',
    'idApplier',
    'value',
    'duration',
    'createdAt',
  ],
};
