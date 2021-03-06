import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class PetSimpleService {

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  /* variables */
  private urlApi = this.gAuthServ.urlApiClient;

  /* methods */
  public getSimpleSericesByPet(idPet: string) {
    return this.http.get(
      this.urlApi + `/client/pets/${idPet}/simple-services`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

}