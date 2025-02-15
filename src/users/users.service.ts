import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where,
      include: {
        accounts: {
          select: {
            userId: true,
            provider: true,
            providerAccountId: true,
            expires_at: true,
          },
        },
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
      throw new NotFoundException("User not found");
    }

    const isMatch = bcrypt.compareSync(password, account?.password ?? "");

    if (!isMatch) {
      throw new BadRequestException("Invalid Credentials");
    }

    return user;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.delete({ where });
  }

  async findIdByEmail(
    where: Prisma.UserWhereUniqueInput
  ): Promise<{ id: string }> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where,
    });

    return { id: user.id };
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const { name, firstName, lastName } = data;

    return await this.prismaService.user.updateManyAndReturn({
      where: {
        id,
      },
      data: {
        name,
        firstName,
        lastName,
      },
    });
  }
}
