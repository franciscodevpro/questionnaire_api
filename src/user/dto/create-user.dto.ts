export type CreateUserDto = {
  login: string;
  password: string;
  name: string;
  token?: string;
  tokenExpiration?: number;
};
