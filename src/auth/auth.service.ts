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

  async createUser(data: CreateUserDTO): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const { email, firstName, lastName } = data;

    return this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
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

      return this.jwtService.sign({ id: user.id });
    });
  }

  async signIn(payload: { email: string; password: string }): Promise<string> {
    const result = await this.usersService.validateUser(payload);

    return this.jwtService.sign({ id: result.id });
  }

  async validateUser(payload: { 
    email: string,
    name?: string, 
    provider: string, 
    providerAccountId: string,
    access_token: string,
    refresh_token: string,
  }): Promise<User> {
    const { email, name, provider, providerAccountId, access_token, refresh_token } = payload

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      }
    });

    if (user) {
      return user;
    } else {
      return this.prismaService.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
          },
        });

        await prisma.account.create({
          data: {
            userId: newUser.id,
            provider: provider.toUpperCase(),
            providerAccountId,
            access_token,
            refresh_token,
          },
        });

        return newUser;
      })
    }
  }
}
