import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Company } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.prismaService.company.create({ data });
  }

  async find(where: Prisma.CompanyWhereUniqueInput): Promise<Company[]> {
    const result = await this.prismaService.company.findMany({
      where,
      include: {
        jobs: true,
      },
    });

    if (result.length === 0) {
      throw new NotFoundException('Cannot find this company');
    }

    return result;
  }
}
