import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../../services/blog.service";
import { Blog } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idBlog = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBlog();
  }

  ngOnInit(): void {
  }

  /* API */
  // variables
  blogFormUpdate: FormGroup;
  idBlog: string;
  blog: Blog;

  // methods
  updateBlog(dataBlog: Blog) {
    this.spinnerStatus = true;
    this.blogService.putBlog(dataBlog, this.idBlog).subscribe((res) => {
      // console.log(res);
      this.spinnerStatus = false;
      this.router.navigateByUrl('/home/blog');
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  /* UI */
  // variables
  spinnerStatus = false;
  // methods
  initBlogFormUpdate() {
    this.blogFormUpdate = this.formBuilder.group({
      'title': [this.blog.title, [Validators.required]],
      'description': [this.blog.description, [Validators.required]],
      'image': [this.blog.image, [Validators.required]]
    });
  }

  getBlog() {
    this.spinnerStatus = true;
    this.blogService.getBlog(this.idBlog).subscribe((res) => {
      // console.log(res);
      this.blog = res['data'];
      this.initBlogFormUpdate();
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
