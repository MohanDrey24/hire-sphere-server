import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO } from './dto/users.dto';
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
    const { email, password } = payload;
    const user = await this.findUser({ email });

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new NotFoundException('Invalid Credentials');
    }

    return {
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({ where });
  }

  /**
   * For local strategy
   * */
  async validateUser(payload: CreateUserDTO) {
    const { email, password } = payload;
    const user = await this.findUser({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    return user;
  }
}
