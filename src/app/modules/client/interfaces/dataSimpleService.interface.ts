import { Pet } from "src/app/global/interfaces/pet.interface";
import { SimpleService } from "src/app/global/interfaces/simpleService.interface";
import { Vet } from "src/app/global/interfaces/vet.interface";

export interface DataSimpleServices {
  pet: Pet;
  simpleService: SimpleService;
  vet: Vet;
}