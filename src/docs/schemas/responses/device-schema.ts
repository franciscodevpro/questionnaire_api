export const deviceSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    pin: {
      type: 'string',
    }
  },
  required: ['id', 'name', 'pin'],
};
