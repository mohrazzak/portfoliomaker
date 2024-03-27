import { Role } from 'src/generated/zod/enums';

export interface ITokenPayload {
  id: string;
  role: Role;
}

export interface IDecodedToken {
  id: string;
  role: Role;

  iat: number;
  exp: number;
}
