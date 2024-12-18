import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Job, Prisma } from '@prisma/client';
import { JobQueryDTO } from './dto/job-query.dto';
import { AutocompleteDTO } from './dto/autocomplete-dto';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  async createJob(data: Prisma.JobCreateInput): Promise<Job> {
    return await this.prismaService.job.create({ data });
  }

  async findAll(): Promise<Job[]> {
    return await this.prismaService.job.findMany({
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "asc"
      },
    });
  }

  async findSpecificJobs(query: JobQueryDTO): Promise<Job[]> {
    const where: Prisma.JobWhereInput = {};

    if (query.id) where.id = query.id;
    if (query.type) where.type = { equals: query.type };
    if (query.country)
      where.country = { contains: query.country, mode: 'insensitive' };

    const result = await this.prismaService.job.findMany({
      where,
    });

    if (result.length === 0) {
      throw new NotFoundException('No job found matching this criteria');
    }

    return result;
  }

  async autocomplete(query: AutocompleteDTO): Promise<Job[]> {
    if (!query) return [];

    const { position, name } = query;

    return this.prismaService.job.findMany({
      where: {
        position: {
          contains: position,
          mode: 'insensitive',
        },
        company: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      },
      take: 10,
    });
  }

  async updateJob(
    data: Prisma.JobUpdateInput,
    where: Prisma.JobWhereUniqueInput,
  ): Promise<Job> {
    return await this.prismaService.job.update({
      data,
      where,
    });
  }

  async deleteJob(where: Prisma.JobWhereUniqueInput): Promise<void> {
    await this.prismaService.job.delete({ where });
  }
}
