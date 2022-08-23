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
      type: 'string',
    },
    passwordConfirmation: {
      type: 'string',
    },
    idDevices: {
      type: 'array',
      items: {
        type: 'integer'
      }
    },
    idAppliers: {
      type: 'array',
      items: {
        type: 'integer'
      }
    }
  },
  required: ['name', 'image', 'quantity', 'endDate', 'link', 'exceedsQuantity', 'canBeOnline', 'passwordConfirmation', 'idDevices', 'idAppliers'],
};
