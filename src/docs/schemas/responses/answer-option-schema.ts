export const answerOptionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
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
  required: ['id','id_question', 'title', 'status'],
};
