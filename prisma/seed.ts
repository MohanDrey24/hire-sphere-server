import { PrismaClient } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD!, salt);

  await prisma.user.upsert({
    where: { email: 'mohandrey@gmail.com' },
    update: {},
    create: {
      email: 'mohandrey@gmail.com',
      firstName: 'Mohan',
      lastName: 'Drey',
      accounts: {
        create: {
          provider: 'CREDENTIALS',
          providerAccountId: uuidV4(),
          password: hashedPassword,
        },
      }
    },
  });

  const company = await prisma.company.upsert({
    where: { id: uuidV4() },
    update: {},
    create: {
      name: "GOOGLE",
    },
  });

  await prisma.job.upsert({
    where: { id: company.id },
    update: {},
    create: {
      company: {
        connect: {
          id: company.id,
        }
      },
      position: "Senior Software Engineer",
      type: "REMOTE",
      country: "Australia",
      salary: 250000,
    }
  })

  const company2 = await prisma.company.upsert({
    where: { id: uuidV4() },
    update: {},
    create: {
      name: "LinkedIn",
    },
  });

  await prisma.job.upsert({
    where: { id: company2.id },
    update: {},
    create: {
      company: {
        connect: {
          id: company2.id,
        }
      },
      position: "Business Analyst",
      type: "REMOTE",
      country: "USA",
      salary: 120000,
    }
  })

  const company3 = await prisma.company.upsert({
    where: { id: uuidV4() },
    update: {},
    create: {
      name: "Netflix",
    },
  });

  await prisma.job.upsert({
    where: { id: company3.id },
    update: {},
    create: {
      company: {
        connect: {
          id: company3.id,
        }
      },
      position: "Database Engineer",
      type: "ONSITE",
      country: "Brazil",
      salary: 200000,
    }
  })

  const company4 = await prisma.company.upsert({
    where: { id: uuidV4() },
    update: {},
    create: {
      name: "VAULDEX",
    },
  });

  await prisma.job.upsert({
    where: { id: company4.id },
    update: {},
    create: {
      company: {
        connect: {
          id: company4.id,
        }
      },
      position: "Junior Software Engineer",
      type: "ONSITE",
      country: "Philippines",
      salary: 6000,
    }
  })

  const company5 = await prisma.company.upsert({
    where: { id: uuidV4() },
    update: {},
    create: {
      name: "Cloudflare",
    },
  });

  await prisma.job.upsert({
    where: { id: company5.id },
    update: {},
    create: {
      company: {
        connect: {
          id: company5.id,
        }
      },
      position: "Devops Engineer",
      type: "HYBRID",
      country: "Germany",
      salary: 100000,
    }
  })

  const company6 = await prisma.company.upsert({
    where: { id: uuidV4() },
    update: {},
    create: {
      name: "Atlassian",
    },
  });

  await prisma.job.upsert({
    where: { id: company6.id },
    update: {},
    create: {
      company: {
        connect: {
          id: company6.id,
        }
      },
      position: "Product Owner",
      type: "ONSITE",
      country: "Japan",
      salary: 90000,
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