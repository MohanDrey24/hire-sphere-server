export class CreateJobDTO {
  id: string;
  company: string;
  position?: string;
  location?: string;
  country?: string;
  salary?: number;
  isAvailable?: string;
  createdAt?: string;
}