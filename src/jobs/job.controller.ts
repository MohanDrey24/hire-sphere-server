import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './interfaces/job.interface';
import { ZodValidationPipe } from './job.pipe';
import { JobDTO, jobSchema } from './dto/job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(jobSchema))
  async createJob(
    @Body() createJobDTO: JobDTO,
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

  @Get()
  async getAll(): Promise<Job[]> {
    return this.jobService.getAll();
  }

  @Put()
  async updateJob(
    @Body() id: string,
    updatedJob: JobDTO,
  ): Promise<Partial<Job>> {
    console.log('put', id);
    return this.jobService.update(id, updatedJob);
  }
}
