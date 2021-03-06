import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class PetHospitalizedService {

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  /* variables */
  private urlApi = this.gAuthServ.urlApiClient;
  /* methods */
  public getHospitalizedServicesByPet(idPet: string) {
    return this.http.get(
      this.urlApi + `/client/pets/${idPet}/hospitalized-services`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}