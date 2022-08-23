export const answerOptionParamsSchema = {
  type: 'object',
  properties: {
    id_question: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    status: {
      type: 'boolean',
    },
  },
  required: ['id_question', 'title', 'status'],
};
