import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const { email } = data;

    return this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
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

      return user;
    });
  }

  async signIn(payload: { email: string; password: string }): Promise<string> {
    const result = await this.usersService.validateUser(payload);

    return this.jwtService.sign({ id: result.id });
  }

  async googleSSO(googleData: {
    email: string;
    provider: string;
    providerAccountId: string;
  }): Promise<string> {
    const { email, provider, providerAccountId } = googleData;

    return this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
        },
      });

      await prisma.account.create({
        data: {
          userId: user.id,
          provider,
          providerAccountId,
        },
      });

      return this.jwtService.sign({ id: user.id });
    });
  }

  async validateUser(profile: any): Promise<any> {
    return profile;
  }
}
