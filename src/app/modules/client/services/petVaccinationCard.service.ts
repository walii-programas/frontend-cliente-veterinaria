import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class PetVaccinationCardService {

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  // variables
  private urlApiClient = this.gAuthServ.urlApiClient;

  // methods
  public getVaccinationCardByPet(idPet: string) {
    return this.http.get(
      this.urlApiClient + `/client/pets/${idPet}/vaccination-cards`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getVaccinationCardDetailsByPvc(idPvc: string) {
    return this.http.get(
      this.urlApiClient + `/client/vaccination-cards/${idPvc}`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}