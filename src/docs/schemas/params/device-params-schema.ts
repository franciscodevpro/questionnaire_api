export const deviceParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    pin: {
      type: 'string',
    }
  },
  required: ['name', 'pin'],
};
