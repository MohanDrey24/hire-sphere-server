import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
// import { UserQuery } from './interfaces/users.interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuidV4 } from 'uuid';

// DAPAT IBALHIN SA AUTH SERVICE
@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  // DONT RETURN ACCOUNT
  async createUser(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
        },
      });

      const account = await prisma.account.create({
        data: {
          userId: user.id,
          provider: 'CREDENTIALS',
          providerAccountId: uuidV4(),
          password: hashedPassword,
        },
      });

      return { user, account };
    });
  }

  async signIn(payload: { email: string; password: string }): Promise<string> {
    const result = await this.validateUser(payload);

    return this.jwtService.sign({ id: result.id });
  }

  findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // USE $transaction
  async validateUser(payload: { email: string; password: string }) {
    const { email, password } = payload;

    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });

    const account = await this.prismaService.account.findFirstOrThrow({
      where: {
        userId: user.id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, account?.password ?? '');

    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    return user;
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({ where });
  }
}
