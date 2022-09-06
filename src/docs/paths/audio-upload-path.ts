export const audioUploadPath = {
  post: {
    tags: ['Upload'],
    summary: 'API to create an user account',
    consumes: ['multipart/form-data'],
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        },
      },
    },
  },
};
