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

  async findSpecificJobs(column: Prisma.JobWhereInput): Promise<Job[]> {
    return await this.prismaService.job.findMany({
      where: column,
    });
  }

  async updateJob(body: {
    data: Prisma.JobUpdateInput;
    where: Prisma.JobWhereUniqueInput;
  }): Promise<Job> {
    const { data, where } = body;
    return await this.prismaService.job.update({
      data,
      where,
    });
  }
}
