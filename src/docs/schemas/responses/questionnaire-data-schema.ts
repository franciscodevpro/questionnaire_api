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
    lat: {
      type: 'string',
    },
    lon: {
      type: 'string',
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
