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
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDTO, createJobSchema } from './dto/create-job.dto';
import { UpdateJobDTO } from './dto/update-job.dto';
import { ZodValidationPipe } from '../common/filters/zod-validation.pipe';
import { Job } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AutocompleteDTO, autocompleteSchema } from './dto/autocomplete-dto';
import { JobSearchDTO } from './dto/job-search-dto';

@UseGuards(AuthGuard('jwt'))
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createJobSchema))
  async createJob(@Body() data: CreateJobDTO): Promise<Job> {
    return await this.jobService.createJob(data);
  }

  @Get('all')
  async findAll(): Promise<Job[]> {
    return await this.jobService.findAll();
  }

  @Put(':id')
  async updateJob(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(createJobSchema)) data: UpdateJobDTO,
  ): Promise<Job> {
    return await this.jobService.updateJob(data, { id });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteJob(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.jobService.deleteJob({ id });
  }

  @Get()
  @UsePipes(new ZodValidationPipe(autocompleteSchema))
  async autocomplete(@Query() query: AutocompleteDTO): Promise<Job[]> {
    return this.jobService.autocomplete(query);
  }

  @Get('search')
  async searchJobs(@Query() query: JobSearchDTO) {
    return this.jobService.searchJobs(query);
  }
}
