export const answerOptionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    idQuestion: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    status: {
      type: 'boolean',
    },
  },
  required: ['id', 'idQuestion', 'title', 'status'],
};
