import { Injectable } from "@angular/core";
import { Pet } from "../interfaces/pet.interface";
import { PetClinicalHistory } from "../interfaces/petClinicalHistory.interface";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";
import { PetVaccinationCard } from "../interfaces/petVaccinationCard.interface";
import { Vaccine } from "../../vaccine/interfaces/vaccine.interface";
import { PetVaccinationCardDetails } from "../interfaces/petVaccinationCardDetails.interface";
import { PetSimpleService, SimpleService } from "../interfaces/petSimpleService.interface";
import { HospitalizedService } from "../interfaces/petHospitalizedService.interface";

@Injectable({
  providedIn: 'root'
})

export class PetService {

  // variables
  private urlApiAdmin = this.gAuthServ.urlApiAdmin;
  
  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  //*-- methods --*/
  /* PET */
  public petsClientGetListAll(idClient: string) {
    return this.http.get(
      this.urlApiAdmin + '/admin/clients/' + idClient + '/pets',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getPet(idPet: string) {
    return this.http.get(
      this.gAuthServ.urlApiAdmin + '/admin/pets/' + idPet,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public petRegister(pet: Pet) {
    return this.http.post(
      this.urlApiAdmin + '/admin/pets', 
      this.gAuthServ.getFormUrlEncoded(pet),
      {headers: this.gAuthServ.getHeaders()});
  }

  /* PET CLINICAL HISTORY */
  public getPetClinicalHistoriesByPet(idPet: string) {
    return this.http.get(
      this.urlApiAdmin + '/admin/pets/' + idPet + '/clinical-histories',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postPetClinicalHistory(clinicalHistory: PetClinicalHistory) {
    return this.http.post(
      this.urlApiAdmin + '/admin/clinical-histories',
      this.gAuthServ.getFormUrlEncoded(clinicalHistory),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  /* PET VACCINATION CARD */
  public getPetVaccinationCardsByPet(idPet: string) {
    return this.http.get(
      this.gAuthServ.urlApiAdmin + '/admin/pets/' + idPet + '/vaccination-cards',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postPetVaccinationCard(vaccinationCard: PetVaccinationCard) {
    return this.http.post(
      this.urlApiAdmin + '/admin/vaccination-cards',
      this.gAuthServ.getFormUrlEncoded(vaccinationCard),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  // get all details from pet vaccination card
  public getVaccinationCardsDetailsByPvc(petVaccinationCard: PetVaccinationCard) {
    return this.http.get(
      this.urlApiAdmin + '/admin/vaccination-cards/' + petVaccinationCard.id + '/pvcdetails',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  // add one vaccine to pet vaccination card
  public postVaccineToPetVaccinationCard(
    dataVaccineSelected: PetVaccinationCardDetails,
    petVaccinationCardSelected: PetVaccinationCard
  ) {
      return this.http.post(
        this.urlApiAdmin + '/admin/vaccination-cards/' + petVaccinationCardSelected.id + '/pvcdetails',
        this.gAuthServ.getFormUrlEncoded(dataVaccineSelected),
        {headers: this.gAuthServ.getHeaders()}
      );
  }

  // remove one vaccine from pet vaccination card
  public deleteVaccineFromPetVaccinationCard(
    idVaccine,
    date,
    petVaccinationCardSelected: PetVaccinationCard
  ) {
    return this.http.put(
      this.urlApiAdmin + '/admin/vaccination-cards/' + petVaccinationCardSelected.id + '/pvcdetails/remove-vaccine',
      this.gAuthServ.getFormUrlEncoded({
        'fk_id_vaccine': idVaccine,
        'date': date
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public putVaccineFromPetVaccinationCard(
    idVaccine,
    date,
    petVaccinationCardSelected: PetVaccinationCard
  ) {
    return this.http.put(
      this.urlApiAdmin + '/admin/vaccination-cards/' + petVaccinationCardSelected.id + '/pvcdetails/update-vet-state',
      this.gAuthServ.getFormUrlEncoded({
        'fk_id_vaccine': idVaccine,
        'date' : date
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  /* PET SIMPLE SERVICES */
  public getSimpleServicesByPet(idPet: string) {
    return this.http.get(
      this.urlApiAdmin + '/admin/pets/' + idPet + '/simple-services',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postPetSimpleService(simpleService: SimpleService) {
    return this.http.post(
      this.urlApiAdmin + '/admin/simple-services',
      this.gAuthServ.getFormUrlEncoded(simpleService),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  /* PET HOSPITALIZED SERVICES */
  public getHospitalizedServicesByPet(idPet: string) {
    return this.http.get(
      this.urlApiAdmin + '/admin/pets/' + idPet + '/hospitalized-services',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postPetHospitalizedService(hospitalizedService: HospitalizedService) {
    return this.http.post(
      this.gAuthServ.urlApiAdmin + '/admin/hospitalized-services',
      this.gAuthServ.getFormUrlEncoded(hospitalizedService),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getHospitalizedService(idHospitalizedService: string) {
    return this.http.get(
      this.urlApiAdmin + '/admin/hospitalized-services/' + idHospitalizedService,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public putHospitalizedService(hospitalizedService: HospitalizedService, idHospitalizedService: string) {
    return this.http.put(
      this.urlApiAdmin + '/admin/hospitalized-services/' + idHospitalizedService,
      this.gAuthServ.getFormUrlEncoded(hospitalizedService),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

}
