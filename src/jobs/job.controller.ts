import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, jobSchema } from './dto/job.dto';
import { ZodValidationPipe } from './job.pipe';
import { Job as JobModel } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(jobSchema))
  async createJob(
    @Body()
    data: CreateJobDTO,
  ): Promise<JobModel> {
    return this.jobService.createJob(data);
  }
}
