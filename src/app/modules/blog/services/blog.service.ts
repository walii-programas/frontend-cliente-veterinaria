import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalAuthService } from "src/app/global/services/globalAuth.service";

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(
    private http: HttpClient,
    private gAuthSer: GlobalAuthService
  ) {}
  
  // variables
  private urlApiClient = this.gAuthSer.urlApiClient;

  // methods
  getBlogs() {
    return this.http.get(
      this.urlApiClient + `/client/blogs`,
      {headers: this.gAuthSer.getHeaders()}
    );
  }
}