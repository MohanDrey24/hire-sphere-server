import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Job, Prisma } from '@prisma/client';
import { JobQueryDTO } from './dto/job-query.dto';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  async createJob(data: Prisma.JobCreateInput): Promise<Job> {
    return await this.prismaService.job.create({
      data,
    });
  }

  async findAll(): Promise<Job[]> {
    return await this.prismaService.job.findMany();
  }

  async findSpecificJobs(query: JobQueryDTO): Promise<Job[]> {
    const where: Prisma.JobWhereInput = {};

    if (query.id) where.id = query.id;
    if (query.company)
      where.company = { contains: query.company, mode: 'insensitive' };
    if (query.position)
      where.position = { contains: query.position, mode: 'insensitive' };
    if (query.location)
      where.location = { contains: query.location, mode: 'insensitive' };
    if (query.country)
      where.country = { contains: query.country, mode: 'insensitive' };
    if (query.salary) where.salary = { gte: query.salary };
    if (query.isAvailable !== undefined) where.isAvailable = query.isAvailable;

    return await this.prismaService.job.findMany({
      where,
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
    await this.prismaService.job.delete({
      where,
    });
  }
}
