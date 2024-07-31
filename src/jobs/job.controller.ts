import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Put,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, UpdateJobDTO, jobSchema } from './dto/job.dto';
import { ZodValidationPipe } from './job.pipe';
import { Job, Prisma } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(jobSchema))
  async createJob(
    @Body()
    data: CreateJobDTO,
  ): Promise<Job> {
    return await this.jobService.createJob(data);
  }

  @Get('all')
  async findAll(): Promise<Job[]> {
    return await this.jobService.findAll();
  }

  @Get()
  async findJobsWithCountry(
    @Query() query: Prisma.JobWhereInput,
  ): Promise<Job[]> {
    return await this.jobService.findSpecificJobs(query);
  }

  @Put()
  @UsePipes(new ZodValidationPipe(jobSchema))
  async updateJob(data: UpdateJobDTO, id: string): Promise<Job> {
    return await this.jobService.updateJob(data, id);
  }
}
