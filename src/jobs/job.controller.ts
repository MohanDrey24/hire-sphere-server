import { Controller, Post, Body } from '@nestjs/common';
import { JobService } from './job.service';
import { Job as JobModel } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // improve validation using zod
  @Post()
  async createJob(
    @Body()
    data?: {
      company: string;
      position: string;
      salary: number;
    },
  ): Promise<JobModel> {
    return this.jobService.createJob(data);
  }
}
