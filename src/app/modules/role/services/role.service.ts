import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";
import { Role } from "../interfaces/role.interface";

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  /* variables */
  private urlApiAdmin = this.gAuthServ.urlApiAdmin;

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  /* methods */
  public getRoles() {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/roles',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postRole(role: Role) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/roles',
      this.gAuthServ.getFormUrlEncoded(role),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public putRole(role: Role, idRole: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + '/admin/roles/' + idRole,
      this.gAuthServ.getFormUrlEncoded(role),
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}