export const questionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    idQuestionnaire: {
      type: 'string',
    },
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
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/answerOption',
      }
    }
  },
  required: ['id', 'idQuestionnaire', 'title', 'variable', 'type', 'minAnswers', 'maxAnswers', 'defaultValue', 'shuffle', 'prioritizeBySelection'],
};
