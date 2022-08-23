export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    login: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    passwordConfirmation: {
      type: 'string',
    },
  },
  required: ['name', 'login', 'password', 'passwordConfirmation'],
};
