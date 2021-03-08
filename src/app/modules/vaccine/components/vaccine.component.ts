import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { VaccineService } from "../service/vaccine.service";
import { Vaccine } from '../interfaces/vaccine.interface';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  // variables
  vaccineFormReg!: FormGroup;
  vaccinesAndUsedQuantity: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vaccineService: VaccineService
  ) { }

  ngOnInit(): void {
    // init form vaccine register
    this.initFormVaccineRegister();
    // get vaccines list
    this.vaccineGetAll();
    // get vaccines and used quantity
    this.getVaccinesAndUsedQuantity();
  }

  // filter vaccines
  vaccines$: Observable<Vaccine[]>;
  filter = new FormControl('');
  vaccines: Vaccine[] = [];
  
  search(text: string): Vaccine[] {
    return this.vaccines.filter(vet => {
      const term = text.toLowerCase();
      return vet.name.toLowerCase().includes(term)
    });
  }
  // -----------------
  
  // switch page
  switchListVaccine = true;
  switchRegVaccine = false;

  spinnerStatus = false;

  /* UI methods */

  switchPageReg() {
    this.switchListVaccine = false;
    this.switchRegVaccine = true;
    this.initFormVaccineRegister();
  }

  switchPageList() {
    this.switchListVaccine = true;
    this.switchRegVaccine = false;
    this.initFormVaccineRegister();
  }

  initFormVaccineRegister() {
    this.vaccineFormReg = this.formBuilder.group({
      'name': ['',[Validators.required, Validators.minLength(3)]]
    });
  }

  /* API methods */

  // get vet list
  vaccineGetAll() {
    this.spinnerStatus = true;
    this.vaccineService.getVaccines().subscribe((res) => {
      // console.log(res);
      this.vaccines = res['data'];
      this.vaccines$ = this.filter.valueChanges.pipe(
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
  vaccineRegister(dataVaccine: Vaccine) {
    // console.log(dataVaccine);
    this.vaccineService.postVaccine(dataVaccine).subscribe((res) => {
      // console.log(res);
      this.switchPageList();
      this.vaccineGetAll();
      this.initFormVaccineRegister();
    }, (err) => {
      console.log(err);
    });
  }

  // get vaccines name and used quantity
  getVaccinesAndUsedQuantity() {
    this.vaccineService.getVaccinesAndCountUsedVaccines().subscribe((res) => {
      console.log(res);
      this.vaccinesAndUsedQuantity = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

}
