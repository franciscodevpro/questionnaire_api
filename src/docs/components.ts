import { apiKeyAuthSchema, basicAuthSchema } from './schemas/';
import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
} from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
    basicAuth: basicAuthSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
};
