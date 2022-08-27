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
    'idSession',
    'idApplier',
    'idDevice',
    'idQuestionnaire',
    'audioPath',
    'coordinates',
    'duration',
  ],
};
