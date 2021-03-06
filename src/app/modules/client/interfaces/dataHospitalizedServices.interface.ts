import { HospitalizedService } from "src/app/global/interfaces/hospitalizedService.interface";
import { Pet } from "src/app/global/interfaces/pet.interface";
import { Vet } from "src/app/global/interfaces/vet.interface";

export interface DataHospitalizedService {
  hospitalizedService: HospitalizedService;
  pet: Pet;
  vet: Vet;
}