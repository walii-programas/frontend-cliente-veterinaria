import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ServiceService } from "../services/service.service";
import { Service } from '../interfaces/service.interface';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  // variables
  serviceFormReg!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    // init form vaccine register
    this.initFormServiceRegister();

    // get vaccines list
    this.getServices();
  }

  // filter services
  services$: Observable<Service[]>;
  filter = new FormControl('');
  services: Service[] = [];
  
  search(text: string): Service[] {
    return this.services.filter(role => {
      const term = text.toLowerCase();
      return role.title.toLowerCase().includes(term)
    });
  }
  // -----------------
  
  // switch page
  switchListService = true;
  switchRegService = false;

  spinnerStatus = false;

  /* UI methods */

  switchPageReg() {
    this.switchListService = false;
    this.switchRegService = true;
    this.initFormServiceRegister();
  }

  switchPageList() {
    this.switchListService = true;
    this.switchRegService = false;
    this.initFormServiceRegister();
  }

  initFormServiceRegister() {
    this.serviceFormReg = this.formBuilder.group({
      'title': ['',[Validators.required, Validators.minLength(3)]],
      'description': ['', [Validators.required]],
      'image': ['', [Validators.required]]
    });
  }

  /* API methods */

  // get blog list
  getServices() {
    this.spinnerStatus = true;
    this.serviceService.getServices().subscribe((res) => {
      // console.log(res);
      this.services = res['data'];
      this.services$ = this.filter.valueChanges.pipe(
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
  registerService(dataService: Service) {
    this.spinnerStatus = true;
    this.serviceService.postService(dataService).subscribe((res) => {
      // console.log(res);
      this.spinnerStatus = false;
      this.switchPageList();
      this.getServices();
      this.initFormServiceRegister();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
