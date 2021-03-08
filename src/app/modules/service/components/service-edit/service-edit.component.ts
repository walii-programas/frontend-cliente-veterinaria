import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceService } from "../../services/service.service";
import { Service } from '../../interfaces/service.interface';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss']
})
export class ServiceEditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idService = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBlog();
  }

  ngOnInit(): void {
  }

  /* API */
  // variables
  serviceFormUpdate: FormGroup;
  idService: string;
  service: Service;

  // methods
  updateBlog(dataService: Service) {
    this.spinnerStatus = true;
    this.serviceService.putService(dataService, this.idService).subscribe((res) => {
      // console.log(res);
      this.spinnerStatus = false;
      this.router.navigateByUrl('/home/servicios');
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  /* UI */
  // variables
  spinnerStatus = false;
  // methods
  initServiceFormUpdate() {
    this.serviceFormUpdate = this.formBuilder.group({
      'title': [this.service.title, [Validators.required]],
      'description': [this.service.description, [Validators.required]],
      'image': [this.service.image, [Validators.required]]
    });
  }

  getBlog() {
    this.spinnerStatus = true;
    this.serviceService.getService(this.idService).subscribe((res) => {
      // console.log(res);
      this.service = res['data'];
      this.initServiceFormUpdate();
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
