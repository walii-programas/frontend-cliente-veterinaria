import { Vet } from "./vet.interface";

export interface PetVaccinationCardDetail {
  vaccine_id: string;
  pet_vaccination_card_id: string;
  fk_id_vet: string;
  date: Date;
  state: string;
  vet: Vet;
}