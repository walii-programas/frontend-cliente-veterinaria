import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/global/interfaces/blog.interface';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private blogService: BlogService
  ) {
    this.getBlogs();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  blogs: Blog[];

  // methods
  getBlogs() {
    this.blogService.getBlogs().subscribe((res) => {
      // console.log(res);
      this.blogs = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

}
