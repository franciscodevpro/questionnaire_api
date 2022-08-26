export const questionnaireDataParamsSchema = {
  type: 'object',
  properties: {
    idApplier: {
      type: 'string',
    },
    idDevice: {
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
    'idSession',
    'idApplier',
    'idDevice',
    'idQuestionnaire',
    'audioPath',
    'coordinates',
    'duration',
  ],
};
