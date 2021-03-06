import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class PetService {

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  /* variables */
  private urlApi = this.gAuthServ.urlApiClient;

  /* methods */
  getPetsByClient(idClient: string) {
    return this.http.get(
      this.urlApi + `/client/clients/${idClient}/pets`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }
  getPet(idPet: string) {
    return this.http.get(
      this.urlApi + `/client/pets/${idPet}`,
      {headers: this.gAuthServ.getHeaders()}
    );
  } 
}