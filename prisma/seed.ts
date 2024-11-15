import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD!, salt);

  const user = await prisma.user.create({
    data: {
      email: 'mohandrey@gmail.com',
      firstName: 'Mohan',
      lastName: 'Drey',
    },
  });

  await prisma.account.create({
    data: {
      userId: user.id,
      provider: 'CREDENTIALS',
      providerAccountId: uuidV4(),
      password: hashedPassword,
    },
  });

  const company = await prisma.company.create({
    data: {
      name: "GOOGLE",
    },
  });

  await prisma.job.create({
    data: {
      company: {
        connect: {
          id: company.id,
        }
      },
      position: "Software Engineer",
      type: "REMOTE",
      country: "Australia",
      salary: 100000,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })