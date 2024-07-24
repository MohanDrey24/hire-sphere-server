import { Injectable, ConflictException } from '@nestjs/common'
import { Job } from './interfaces/job.interface'

@Injectable()
export class JobService {
  private readonly jobs: Job[] = []

  create(job: Job): Job {
    const existingJob = this.jobs.find(elem => elem.id === job.id)
    if (existingJob) {
      throw new ConflictException(`Job ID with ID ${job.id} already exists`)
    }

    this.jobs.push(job)
    console.log(this.jobs)
    return job
  }

  find(id: string): Job | undefined {
    return this.jobs.find(job => job.id === id)
  }
}