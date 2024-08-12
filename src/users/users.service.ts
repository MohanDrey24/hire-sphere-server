import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
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

  async signIn(payload: CreateUserDTO): Promise<Record<string, string>> {
    const result = await this.validateUser(payload);

    return {
      access_token: this.jwtService.sign({ id: result.id }),
    };
  }

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<UserQuery> {
    return await this.prismaService.user.findUniqueOrThrow({
      where,
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async validateUser(payload: CreateUserDTO): Promise<User> {
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

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.prismaService.user.delete({ where });
  }
}
