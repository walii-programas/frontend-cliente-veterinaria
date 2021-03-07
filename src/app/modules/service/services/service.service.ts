import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(
    private http: HttpClient,
    private gAuthSer: GlobalAuthService
  ) {}
  
  // variables
  private urlApiClient = this.gAuthSer.urlApiClient;

  // methods
  getBlogs() {
    return this.http.get(
      this.urlApiClient + `/client/services`,
      {headers: this.gAuthSer.getHeaders()}
    );
  }
}