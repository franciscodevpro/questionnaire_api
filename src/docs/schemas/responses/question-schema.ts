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
    answerOptions: {
      type: 'array',
      items: {
        $ref: '#/schemas/answerOption',
      },
    },
  },
  required: [
    'id',
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

export const questionCreationSchema = {
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
    'id',
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
