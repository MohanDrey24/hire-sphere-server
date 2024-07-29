import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Job, UpdateJob } from './interfaces/job.interface';
import { ZodValidationPipe } from './job.pipe';
import {
  // JobDTO,
  // jobSchema,
  UpdateJobDTO,
  updateJobSchema,
} from './dto/job.dto';
import { Job as JobModel } from '@prisma/client';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @Post()
  // @UsePipes(new ZodValidationPipe(jobSchema))
  // async createJob(
  //   @Body() createJobDTO: JobDTO,
  // ): Promise<Record<string, unknown>> {
  //   const createdJob = this.jobService.create(createJobDTO);
  //   return {
  //     message: 'A job has been created',
  //     data: createdJob,
  //   };
  // }

  @Get(':id')
  async findJob(@Param('id') id: string): Promise<Job | undefined> {
    return this.jobService.find(id);
  }

  @Get()
  async getAll(): Promise<Job[]> {
    return this.jobService.getAll();
  }

  @Put()
  @UsePipes(new ZodValidationPipe(updateJobSchema))
  async updateJob(
    @Body()
    updateJob: UpdateJobDTO,
  ): Promise<UpdateJob> {
    return this.jobService.update(updateJob);
  }

  @Post()
  async createJob(
    @Body()
    data?: {
      company: string;
      position: string;
      location: string;
      country: string;
      salary: number;
    },
  ): Promise<JobModel> {
    return this.jobService.createJob(data);
  }
}
