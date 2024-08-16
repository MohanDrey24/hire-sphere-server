import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserQuery } from './interfaces/users.interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async signIn(payload: { email: string; password: string }): Promise<string> {
    const result = await this.validateUser(payload);

    return this.jwtService.sign({ id: result.id });
  }

  findUser(where: Prisma.UserWhereUniqueInput): Promise<UserQuery> {
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

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<User> {
    const { email, password } = payload;

    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    return user;
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({ where });
  }
}
