import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Param,
  Put,
  Query,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, createJobSchema } from './dto/create-job.dto';
import { UpdateJobDTO, updateJobSchema } from './dto/update-job.dto';
import { ZodValidationPipe } from '../../common/filters/zod-validation.pipe';
import { Job } from '@prisma/client';
import { JobQueryDTO } from './dto/job-query.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
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
  async findSpecificJobs(@Query() query: JobQueryDTO): Promise<Job[]> {
    return await this.jobService.findSpecificJobs(query);
  }

  @Put(':jobId')
  async updateJob(
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Body(new ZodValidationPipe(updateJobSchema)) data: UpdateJobDTO,
  ): Promise<Job> {
    return await this.jobService.updateJob(data, { jobId });
  }

  @Delete(':jobId')
  @HttpCode(204)
  async deleteJob(@Param('jobId', ParseUUIDPipe) jobId: string): Promise<void> {
    await this.jobService.deleteJob({ jobId });
  }
}
