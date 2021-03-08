import { Injectable } from "@angular/core";
import { Vet } from "../interfaces/vet.interface";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class VetService {

  // variables
  private urlApiAdmin = this.gAuthServ.urlApiAdmin; 
  
  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  // metodos
  public vetGetListAll() {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/vets',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getVet(idVet: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/vets/' + idVet,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getVetRoles(idVet: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/vets/' + idVet + '/roles',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public vetRegister(vet: Vet) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/vets',
      this.gAuthServ.getFormUrlEncoded(vet),
      {headers: this.gAuthServ.getHeaders()});
  }

  public vetUpdate(vet: Vet, idVet: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + '/admin/vets/' + idVet,
      this.gAuthServ.getFormUrlEncoded(vet),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public vetPasswordUpdate(password: string, idVet: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + '/admin/vets/' + idVet + '/password',
      this.gAuthServ.getFormUrlEncoded({
        password: password
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public asignRole(idVet: string, idRole: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/vets/' + idVet + '/roles/asign',
      this.gAuthServ.getFormUrlEncoded({
        id_role: idRole
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public denyRole(idVet: string, idRole: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/vets/' + idVet + '/roles/deny',
      this.gAuthServ.getFormUrlEncoded({
        id_role: idRole
      }),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

}