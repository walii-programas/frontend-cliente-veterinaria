import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";
import { Login } from "../interfaces/login.interface";

@Injectable({
  providedIn:'root'
})

export class LoginService {

  /* variables */
  private urlApi = 'http://localhost:8000/api';

  constructor(
    private http:HttpClient,
    private globalAuth: GlobalAuthService
  ) {}

  /* methods */
  public login(dataLogin: Login) {
    return this.http.post(
      this.urlApi + '/auth/login',
      this.globalAuth.getFormUrlEncoded(dataLogin),
      {headers: this.globalAuth.getHeaders()}
    );
  }
}