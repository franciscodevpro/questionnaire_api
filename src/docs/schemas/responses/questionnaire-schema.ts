export const questionnaireSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    quantity: {
      type: 'string',
    },
    endDate: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    exceedsQuantity: {
      type: 'boolean',
    },
    canBeOnline: {
      type: 'string',
    },
    devices: {
      type: 'array',
      items: {
        $ref: '#/schemas/device',
      },
    },
    appliers: {
      type: 'array',
      items: {
        $ref: '#/schemas/applier',
      },
    },
  },
  required: [
    'id',
    'name',
    'image',
    'quantity',
    'endDate',
    'link',
    'exceedsQuantity',
    'canBeOnline',
    'idDevices',
    'idAppliers',
  ],
};
