import { CreateJobDTO } from '../dto/create-job.dto';

export type Job = Partial<Omit<CreateJobDTO, 'id' | 'createdAt' | 'updatedAt'>>;
