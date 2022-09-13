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
    deviceIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    applierIds: {
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
    'deviceIds',
    'applierIds',
  ],
};
