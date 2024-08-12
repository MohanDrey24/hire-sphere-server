import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Job, Prisma } from '@prisma/client';
import { JobQueryDTO } from './dto/job-query.dto';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  async createJob(data: Prisma.JobCreateInput): Promise<Job> {
    return await this.prismaService.job.create({ data });
  }

  async findAll(): Promise<Job[]> {
    return await this.prismaService.job.findMany();
  }

  // NEED MORE EXHAUSTIVE FIND QUERY
  async findSpecificJobs(query: JobQueryDTO): Promise<Job[]> {
    const where: Prisma.JobWhereInput = {};

    if (query.id) where.id = query.id;
    if (query.position)
      where.position = { contains: query.position, mode: 'insensitive' };
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
