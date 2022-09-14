export const audioUploadSchema = {
  type: 'object',
  properties: {
    mimetype: {
      type: 'string',
    },
    filename: {
      type: 'string',
    },
    path: {
      type: 'string',
    },
    size: {
      type: 'integer',
    },
  },
};
