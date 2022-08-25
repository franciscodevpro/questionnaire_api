export const questionnaireParamsSchema = {
  type: 'object',
  properties: {
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
      type: 'boolean',
    },
    idDevices: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    idAppliers: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: [
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
