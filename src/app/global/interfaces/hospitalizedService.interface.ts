export interface HospitalizedService {
  id: string;
  date: Date;
  diagnosis: string;
  description: string;
  treatment: string;
  cost: string;
  weight: number;
  temperature: number
  symptoms: string;
  observations: string;
  fk_id_pet: string;
  fk_id_veterinary: string;
  updated_at: Date;
}