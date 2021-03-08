import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Location, DatePipe } from "@angular/common";
import { PetService } from "../../service/pet.service";
import { PetSimpleService, SimpleService } from '../../interfaces/petSimpleService.interface';
import { Client } from "../../../client/interfaces/client.interface";
import { Pet } from '../../interfaces/pet.interface';

@Component({
  selector: 'app-pet-simple-service',
  templateUrl: './pet-simple-service.component.html',
  styleUrls: ['./pet-simple-service.component.scss']
})
export class PetSimpleServiceComponent implements OnInit {

  // variables
  idPet: string;
  client: Client;
  pet: Pet;

  simpleServiceFormReg!: FormGroup;
  simpleServices: PetSimpleService[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private datePipe: DatePipe
  ) {
    // get id_client on load
    this.idPet = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    // init form vet register
    this.initFormRegSimpleService();
    // get client
    this.client = this.getLocalStorageClient();
    // get pet
    this.getLocalStoragePet();
    this.getPet();
    // get pet's clinical histories
    this.getSimpleServicesByPet();
  }

  /* API METHODS */
  /* ----------------------- */

  // get pet's simple services
  getSimpleServicesByPet() {
    this.spinnerStatus = true;
    this.petService.getSimpleServicesByPet(this.idPet).subscribe((res) => {
      // console.log(res);
      res['data'].forEach(pss => {
        pss.simpleService.date = this.datePipe.transform(pss.simpleService.date, "EEEE, dd 'de' MMMM 'del' y, h:mm a")
      });
      this.simpleServices = res['data'];
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  // get pet
  getPet() {
    this.petService.getPet(this.idPet).subscribe((res) => {
      // console.log(res);
      this.pet = res['data'];
      localStorage.setItem('petSelected', JSON.stringify(this.pet));
    }, (err) => {
      console.log(err);
    });
  }

  // register new simple service
  registerSimpleService(dataSimpleService: SimpleService) {
    dataSimpleService.fk_id_pet = this.idPet;
    this.petService.postPetSimpleService(dataSimpleService).subscribe((res) => {
      console.log(res);
      this.switchToPetSimpleServicesList();
      this.getSimpleServicesByPet();
    }, (err) => {
      console.log(err);
    });
  }

  /* UI METHODS */
  /* ---------------------- */
  // variables
  switchSimpleServicesList = true;
  switchSimpleServiceFormReg = false;

  spinnerStatus = false;
  
  // methods
  switchToPetSimpleServicesList() {
    this.switchSimpleServicesList = true;
    this.switchSimpleServiceFormReg = false;
    this.initFormRegSimpleService();
  }

  switchToPetSimpleServiceFormReg() {
    this.switchSimpleServicesList = false;
    this.switchSimpleServiceFormReg = true;
    this.initFormRegSimpleService();
  }

  backToPets() {
    this.location.back();
  }

  // init form
  initFormRegSimpleService() {
    this.simpleServiceFormReg = this.formBuilder.group({
      'name': ['',[Validators.required]],
      'description': ['',[]],
      'treatment': ['', []],
      'cost': ['', [Validators.required]],
      'weight': ['', [Validators.required]],
      'temperature': ['', []],
      'symptoms': ['', []],
      'observations': ['', []]
    });
  }

  // get client from local storage
  getLocalStorageClient() {
    return JSON.parse(localStorage.getItem('clientSelected'));
  }

  // get pet from local storage
  getLocalStoragePet() {
    JSON.parse(localStorage.getItem('pets/' + this.client.id)).forEach(pet => {
      if (pet.id == this.idPet) {
        this.pet = pet;
      }
    });
  }

}
