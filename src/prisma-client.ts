import { PrismaClient } from '@prisma/client';

// unused because it will omit the password globally
export class OmittedPrismaClient extends PrismaClient {
  constructor() {
    super({
      omit: {
        account: {
          password: true,
        },
      },
    });
  }
}
