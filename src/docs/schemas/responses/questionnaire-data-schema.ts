export const questionnaireDataSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    applier: {
      type: 'string',
    },
    device: {
      type: 'string',
    },
    idQuestionnaire: {
      type: 'string',
    },
    audioPath: {
      type: 'string',
    },
    coordinates: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    duration: {
      type: 'integer',
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/answer',
      }
    }
  },
  required: ['id', 'idApplier', 'idDevice', 'idQuestionnaire', 'audioPath', 'coordinates', 'duration'],
};
