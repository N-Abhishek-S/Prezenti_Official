import { RoleName } from '@prisma/client';

export interface AuthenticatedUser {
  sub: string;
  email: string;
  roles: RoleName[];
  permissions: string[];
}
