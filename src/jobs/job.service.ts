import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Job } from './interfaces/job.interface';

@Injectable()
export class JobService {
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

  // there is something wrong with this method
  update(id: string, updatedJob: Partial<Job>): Partial<Job> {
    console.log('service put id', id);
    const jobIndex = this.jobs.findIndex((job) => job.id === id);
    console.log('jobIndex', jobIndex);
    if (jobIndex === -1) {
      throw new NotFoundException(
        `Job with ID of${id} does not exist and cannot be updated`,
      );
    }

    const updatedJobData = { ...this.jobs[jobIndex], ...updatedJob };
    updatedJobData.id = id;
    this.jobs[jobIndex] = updatedJobData;
    return updatedJobData;
  }
}
