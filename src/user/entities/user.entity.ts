export type User = {
  id: string;
  login: string;
  password: string;
  name: string;
  token?: string;
  tokenExpiration?: number;
  isActive: boolean;
};
