import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";
import { Blog } from "../interfaces/blog.interface";

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  /* variables */
  private urlApiAdmin = this.gAuthServ.urlApiAdmin;

  constructor(
    private http: HttpClient,
    private gAuthServ: GlobalAuthService
  ) {}

  /* methods */
  public getBlogs() {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + '/admin/blogs',
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public getBlog(idBlog: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.get(
      this.urlApiAdmin + `/admin/blogs/${idBlog}`,
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public postBlog(blog: Blog) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.post(
      this.urlApiAdmin + '/admin/blogs',
      this.gAuthServ.getFormUrlEncoded(blog),
      {headers: this.gAuthServ.getHeaders()}
    );
  }

  public putBlog(blog: Blog, idBlog: string) {
    this.gAuthServ.validateAndRefreshToken();
    return this.http.put(
      this.urlApiAdmin + `/admin/blogs/${idBlog}`,
      this.gAuthServ.getFormUrlEncoded(blog),
      {headers: this.gAuthServ.getHeaders()}
    );
  }
}