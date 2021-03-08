import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";
import { Service } from "../interfaces/service.interface";

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  /* variables */
  private urlApiAdmin = this.gAuthServ.urlApiAdmin;

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  /* methods */
  public getServices() {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/services',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getService(idService: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + `/admin/services/${idService}`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postService(service: Service) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/services',
      this.gAuthServ.getFormUrlEncoded(service),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public putService(service: Service, idService: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + `/admin/services/${idService}`,
      this.gAuthServ.getFormUrlEncoded(service),
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}