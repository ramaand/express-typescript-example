import { DocumentResult } from './Global';

interface IUser extends DocumentResult {
  name: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface IUserWithId extends IUser {
  id: string;
}

interface IUserTokenResponse extends IUser {
  __(key: string, variables?: Record<string, unknown>): string;
  user: IUserWithId;
  cookies: {
    [key: string]: string;
  };
  params: any;
}
