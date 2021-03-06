import { PetVaccinationCard } from "src/app/global/interfaces/petVaccinationCard.interface";
import { PetVaccinationCardDetail } from "src/app/global/interfaces/petVaccinationCardDetail.interface";
import { Vaccine } from "src/app/global/interfaces/vaccine.interface";

export interface dataPetVaccinationCardAndDetail {
  petVaccinationCard: PetVaccinationCard;
  vaccines: [
    vaccine: Vaccine,
    pivot: PetVaccinationCardDetail
  ];
}