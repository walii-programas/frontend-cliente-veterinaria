import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { BlogService } from "../services/blog.service";
import { Blog } from '../interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  // variables
  blogFormReg!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    // init form vaccine register
    this.initFormBlogRegister();

    // get vaccines list
    this.getBlogs();
  }

  // filter blogs
  blogs$: Observable<Blog[]>;
  filter = new FormControl('');
  blogs: Blog[] = [];
  
  search(text: string): Blog[] {
    return this.blogs.filter(role => {
      const term = text.toLowerCase();
      return role.title.toLowerCase().includes(term)
    });
  }
  // -----------------
  
  // switch page
  switchListBlog = true;
  switchRegBlog = false;

  spinnerStatus = false;

  /* UI methods */

  switchPageReg() {
    this.switchListBlog = false;
    this.switchRegBlog = true;
    this.initFormBlogRegister();
  }

  switchPageList() {
    this.switchListBlog = true;
    this.switchRegBlog = false;
    this.initFormBlogRegister();
  }

  initFormBlogRegister() {
    this.blogFormReg = this.formBuilder.group({
      'title': ['',[Validators.required, Validators.minLength(3)]],
      'description': ['', [Validators.required]],
      'image': ['', [Validators.required]]
    });
  }

  /* API methods */

  // get blog list
  getBlogs() {
    this.spinnerStatus = true;
    this.blogService.getBlogs().subscribe((res) => {
      // console.log(res);
      this.blogs = res['data'];
      this.blogs$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  // register new vet
  registerBlog(datBlog: Blog) {
    this.spinnerStatus = true;
    this.blogService.postBlog(datBlog).subscribe((res) => {
      // console.log(res);
      this.spinnerStatus = false;
      this.switchPageList();
      this.getBlogs();
      this.initFormBlogRegister();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
