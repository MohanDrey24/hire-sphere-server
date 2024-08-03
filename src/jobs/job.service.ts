import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Job, Prisma } from '@prisma/client';

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

  async findSpecificJobs(where: Prisma.JobWhereInput): Promise<Job[]> {
    return await this.prismaService.job.findMany({
      where,
    });
  }

  async updateJob(
    data: Prisma.JobUncheckedUpdateInput,
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
