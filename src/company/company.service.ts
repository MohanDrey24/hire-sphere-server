import { Injectable } from "@nestjs/common";
import { Prisma, Company } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prismaService.company.create({ data });
  }

  async find(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return await this.prismaService.company.findUniqueOrThrow({
      where,
      include: {
        jobs: true,
      },
    });
  }
}
