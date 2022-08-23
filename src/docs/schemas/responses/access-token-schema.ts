export const accessTokenSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
    expiresIn: {
      type: 'integer',
    }
  },
};
