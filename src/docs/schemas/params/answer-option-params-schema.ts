export const answerOptionParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    status: {
      type: 'boolean',
    },
  },
  required: ['title', 'status'],
};
