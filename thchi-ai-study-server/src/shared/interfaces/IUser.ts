import { Role } from 'generated/prisma/enums';

export interface AccessTokenPayload {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface RefreshTokenPayload {
  id: string;
}

export interface GoogleUser {
  googleId: string;
  name: string;
  email: string;
  avatar: string;
}
