export const questionParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    variable: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    minAnswers: {
      type: 'integer',
    },
    maxAnswers: {
      type: 'integer',
    },
    defaultValue: {
      type: 'string',
    },
    shuffle: {
      type: 'boolean',
    },
    prioritizeBySelection: {
      type: 'boolean',
    },
  },
  required: [
    'idQuestionnaire',
    'title',
    'variable',
    'type',
    'minAnswers',
    'maxAnswers',
    'defaultValue',
    'shuffle',
    'prioritizeBySelection',
  ],
};
