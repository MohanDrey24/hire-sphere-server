import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Job, UpdateJob } from './interfaces/job.interface';
import { PrismaService } from './../prisma.service';
import { Job as PrismaJob, Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  private readonly jobs: Job[] = [];

  create(job: Job): Job {
    const existingJob = this.jobs.find((elem) => elem.id === job.id);
    if (existingJob) {
      throw new ConflictException(`Job ID with ID ${job.id} already exists`);
    }

    this.jobs.push(job);
    console.log(this.jobs);
    return job;
  }

  find(id: string): Job | undefined {
    const job = this.jobs.find((job) => job.id === id);
    if (!job) {
      throw new NotFoundException(`Job with ID of ${id} does not exist.`);
    } else {
      return job;
    }
  }

  getAll(): Job[] {
    return this.jobs;
  }

  update(payload: UpdateJob): UpdateJob {
    const jobIndex = this.jobs.findIndex((job) => job.id === payload.id);

    if (jobIndex === -1) {
      throw new NotFoundException(
        `Job with ID of${payload.id} does not exist and cannot be updated`,
      );
    }

    const updatedJobData = { ...this.jobs[jobIndex], ...payload.updatedJob };
    updatedJobData.id = payload.id;
    this.jobs[jobIndex] = updatedJobData;
    return updatedJobData;
  }

  async createJob(data: Prisma.JobCreateInput): Promise<PrismaJob> {
    return this.prismaService.job.create({
      data,
    });
  }
}
