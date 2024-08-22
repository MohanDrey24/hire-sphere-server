import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where,
      include: {
        accounts: true,
      },
    });
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<User> {
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

  async findIdByEmail(where: Prisma.UserWhereUniqueInput): Promise<{ id: string }> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where,
    });

    return { id: user.id };
  }
}
