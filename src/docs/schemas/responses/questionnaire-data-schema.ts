export const questionnaireDataSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    applier: {
      $ref: '#/schemas/applier',
    },
    device: {
      $ref: '#/schemas/device',
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
        type: 'string',
      },
      minItems: 2,
      maxItems: 2,
    },
    duration: {
      type: 'integer',
    },
  },
  required: [
    'id',
    'idApplier',
    'idDevice',
    'idQuestionnaire',
    'audioPath',
    'coordinates',
    'duration',
  ],
};
