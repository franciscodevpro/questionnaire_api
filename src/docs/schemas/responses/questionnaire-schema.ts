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
    passwordConfirmation: {
      type: 'string',
    },
    idDevices: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    idAppliers: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    questions: {
      type: 'array',
      items: {
        $ref: '#/schemas/question',
      }
    }
  },
  required: ['id', 'name', 'image', 'quantity', 'endDate', 'link', 'exceedsQuantity', 'canBeOnline', 'passwordConfirmation', 'idDevices', 'idAppliers'],
};
