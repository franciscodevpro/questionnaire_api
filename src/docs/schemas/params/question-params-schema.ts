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
      type: 'string',
    },
    maxAnswers: {
      type: 'string',
    },
    defaultValue: {
      type: 'string',
    },
    shuffle: {
      type: 'string',
    },
    prioritizeBySelection: {
      type: 'string',
    }
  },
  required: ['idQuestionnaire', 'title', 'variable', 'type', 'minAnswers', 'maxAnswers', 'defaultValue', 'shuffle', 'prioritizeBySelection'],
};
