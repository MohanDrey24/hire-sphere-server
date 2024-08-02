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
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, createJobSchema } from './dto/create-job.dto';
import {
  UpdateJobDTO,
  // updateJobSchema
} from './dto/update-job.dto';
import { ZodValidationPipe } from './job.pipe';
import { Job, Prisma } from '@prisma/client';

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
  // dont use prisma types in controller
  async findJobsWithCountry(
    @Query() query: Prisma.JobWhereInput,
  ): Promise<Job[]> {
    return await this.jobService.findSpecificJobs(query);
  }

  //buggy ang zod validation pipe
  @Put(':id')
  // @UsePipes(new ZodValidationPipe(updateJobSchema))
  async updateJob(
    @Param('id') id: string,
    @Body() data: UpdateJobDTO,
  ): Promise<Job> {
    return await this.jobService.updateJob(data, { id });
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string): Promise<void> {
    return await this.jobService.deleteJob({ id });
  }
}
