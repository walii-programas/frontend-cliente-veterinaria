import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class UnvaccinatedVaccineService {
  
  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  // variables
  private urlApiClient = this.gAuthServ.urlApiClient;

  // methods
  getUnvaccinatedVaccinesByClient() {
    return this.http.get(
      this.urlApiClient + `/client/vaccination-cards/unvaccinated-vaccines`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}