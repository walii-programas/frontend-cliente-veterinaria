import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { HospitalizedService } from '../../../interfaces/petHospitalizedService.interface';
import { PetService } from "../../../service/pet.service";

@Component({
  selector: 'app-pet-hospitalized-service-edit',
  templateUrl: './pet-hospitalized-service-edit.component.html',
  styleUrls: ['./pet-hospitalized-service-edit.component.scss']
})
export class PetHospitalizedServiceEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private petService: PetService
  ) {
    // capture hospitalized service id
    this.idHospitalizedService = this.activatedRoute.snapshot.paramMap.get('id');
    // init form update
    this.initFormUpdateFirst();
    // init form with data
    this.getHospitalizedService();
  }

  ngOnInit(): void {
  }

  /* API */
  // variables
  idHospitalizedService: string;
  hospitalizedServiceFormUpdate: FormGroup;
  hospitalizedService: HospitalizedService;

  // methods
  getHospitalizedService() {
    this.spinnerStatus = true;
    this.petService.getHospitalizedService(this.idHospitalizedService).subscribe((res) => {
      console.log(res);
      this.hospitalizedService = res['data'];
      this.initFormUpdate();
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  updateHospitalizedService(hospitalizedService: HospitalizedService) {
    this.spinnerStatus = true;
    this.petService.putHospitalizedService(hospitalizedService, this.idHospitalizedService).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      this.location.back();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  /* UI */
  // variables
  spinnerStatus = false;

  // methods
  initFormUpdateFirst() {
    this.hospitalizedServiceFormUpdate = this.formBuilder.group({
      'diagnosis': ['', [Validators.required]],
      'description': ['', []],
      'treatment': ['', [Validators.required]],
      'cost': ['', [Validators.required]],
      'weight': ['', [Validators.required]],
      'temperature': ['', [Validators.required]],
      'symptoms': ['', [Validators.required]],
      'observations': ['', []]
    });
  }

  initFormUpdate() {
    this.hospitalizedServiceFormUpdate = this.formBuilder.group({
      'diagnosis': [this.hospitalizedService.diagnosis, [Validators.required]],
      'description': [this.hospitalizedService.description, []],
      'treatment': [this.hospitalizedService.treatment, [Validators.required]],
      'cost': [this.hospitalizedService.cost, [Validators.required]],
      'weight': [this.hospitalizedService.weight, [Validators.required]],
      'temperature': [this.hospitalizedService.temperature, [Validators.required]],
      'symptoms': [this.hospitalizedService.symptoms, [Validators.required]],
      'observations': [this.hospitalizedService.observations, []]
    });
  }

  backToPetHospitalizedServices() {
    this.location.back();
  }

}
