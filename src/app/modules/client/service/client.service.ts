import { Injectable } from "@angular/core";
import { Client } from "../interfaces/client.interface";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  // variables
  private urlApiAdmin = this.gAuthServ.urlApiAdmin; 
  
  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  // metodos
  public clientGetListAll() {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/clients',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getCLient(idCLient: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/clients/' + idCLient,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public clientRegister(client: Client) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/clients', 
      this.gAuthServ.getFormUrlEncoded(client),
      {headers: this.gAuthServ.getHeaders()});
  }

  public clientUpdate(client: Client, idClient: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + '/admin/clients/' + idClient,
      this.gAuthServ.getFormUrlEncoded(client),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public clientPasswordUpdate(password: string, idClient: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + '/admin/clients/' + idClient + '/password',
      this.gAuthServ.getFormUrlEncoded({
        password: password
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

}