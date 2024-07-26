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

export interface UpdateJob {
  id?: string;
  updatedJob?: Job;
}
