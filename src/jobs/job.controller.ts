import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './interfaces/job.interface';
import { ZodValidationPipe } from './job.pipe';
import { CreateJobDTO } from './dto/create-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob(
    @Body(ZodValidationPipe) createJobDTO: CreateJobDTO,
  ): Promise<Record<string, unknown>> {
    const createdJob = this.jobService.create(createJobDTO);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'A job has been created',
      data: createdJob,
    };
  }

  @Get(':id')
  async findJob(@Param('id') id: string): Promise<Job | undefined> {
    return this.jobService.find(id);
  }
}
