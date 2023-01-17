export const reportsQuestionnaireDataSchema = {
  type: 'object',
  properties: {
    questionnaire: {
      type: 'object',
      $ref: '#/schemas/questionnaire',
    },
    questionnaireData: {
      type: 'array',
      items: {
        $ref: '#/schemas/questionnaireData',
      },
    },
    questions: {
      type: 'array',
      items: {
        $ref: '#/schemas/question',
      },
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/answer',
      },
    },
  },
};
