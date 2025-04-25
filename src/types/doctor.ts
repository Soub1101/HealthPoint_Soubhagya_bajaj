
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  experience: number;
  fee: number;
  consultationType: ConsultationType[];
  image?: string;
}

export enum ConsultationType {
  VIDEO_CONSULT = "Video Consult",
  IN_CLINIC = "In Clinic"
}

export interface FilterState {
  search: string;
  consultationType: ConsultationType | null;
  specialties: string[];
  sortBy: SortOption | null;
}

export enum SortOption {
  FEES_ASC = "fees_asc",
  EXPERIENCE_DESC = "experience_desc"
}
