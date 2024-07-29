import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { Job as PrismaJob, Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  async createJob(data: Prisma.JobCreateInput): Promise<PrismaJob> {
    return this.prismaService.job.create({
      data,
    });
  }
}
