// convert to zod

export class JobSearchDTO {
  query?: string;
  type?: "REMOTE" | "ONSITE" | "HYBRID";
  minSalary?: number;
  maxSalary?: number;
  country?: string;
  page?: number = 1;
  limit?: number = 10;
  sortBy?: 'salary' | 'createdAt' = 'createdAt';
  sortOrder?: 'asc' | 'desc' = 'desc';
}