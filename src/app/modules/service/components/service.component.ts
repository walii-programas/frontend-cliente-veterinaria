import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/global/interfaces/service.interface';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(
    private serviceService: ServiceService
  ) {
    this.getServices();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  services: Service[];

  // methods
  getServices() {
    this.serviceService.getBlogs().subscribe((res) => {
      // console.log(res);
      this.services = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

}
