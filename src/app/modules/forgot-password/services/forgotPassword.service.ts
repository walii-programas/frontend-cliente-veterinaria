import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  // variables
  private urlApi = this.gAuthServ.urlApiClient;

  // methods
  requestPasswordChange(email: string) {
    return this.http.post(
      this.urlApi + `/client/clients/forgot-password`,
      this.gAuthServ.getFormUrlEncoded({
        email: email
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  changePassword(password: string, verification_token: string) {
    return this.http.put(
      this.urlApi + `/client/client/change-password/${verification_token}`,
      this.gAuthServ.getFormUrlEncoded({
        password: password
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}