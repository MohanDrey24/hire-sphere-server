import { User } from '@prisma/client';

export type UserQuery = Omit<User, 'password'>;
