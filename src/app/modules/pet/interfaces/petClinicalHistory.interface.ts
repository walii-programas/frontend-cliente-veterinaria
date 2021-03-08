export interface PetClinicalHistory {
  id: string;
  date: Date;
  weight: number;
  temperature: number;
  observations: string;
  fk_id_pet: string;
}

export interface PetClinicalHistoryListPet {
  date: Date;
  weight: number;
  temperature: number;
  observations?: string;
  id_Pet?: string;
}