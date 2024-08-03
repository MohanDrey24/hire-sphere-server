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
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, createJobSchema } from './dto/create-job.dto';
import { UpdateJobDTO, updateJobSchema } from './dto/update-job.dto';
import { ZodValidationPipe } from './job.pipe';
import { Job } from '@prisma/client';

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
  async findJobsWithCountry(@Query() id: string): Promise<Job[]> {
    return await this.jobService.findSpecificJobs({ id });
  }

  @Put(':id')
  async updateJob(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateJobSchema)) data: UpdateJobDTO,
  ): Promise<Job> {
    return await this.jobService.updateJob(data, { id });
  }

  @Delete(':id')
  async deleteJob(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.jobService.deleteJob({ id });
  }
}
