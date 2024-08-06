import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  saltOrRounds: number = 10;

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, this.saltOrRounds);

    return await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async signIn(payload: { email: string; password: string }): Promise<void> {
    const { email, password } = payload;
    const user = await this.findUser({ email });

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new NotFoundException('Invalid Credentials');
    } else {
      console.log('SUCCESSFULLY LOGGED IN');
    }
  }

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where });
  }
}
