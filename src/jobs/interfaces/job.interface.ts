// import { CreateJobDTO } from "../dto/create-job.dto";

export interface Job {
  id?: string;
  company?: string;
  position?: string;
  location?: string;
  country?: string;
  salary?: number;
  isAvailable?: boolean;
  createdAt?: string;
}
