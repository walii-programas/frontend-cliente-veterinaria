import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Location, DatePipe } from "@angular/common";
import { PetService } from "../../service/pet.service";
import { HospitalizedService, PetHospitalizedService } from '../../interfaces/petHospitalizedService.interface';
import { Client } from "../../../client/interfaces/client.interface";
import { Pet } from '../../interfaces/pet.interface';

@Component({
  selector: 'app-pet-hospitalized-service',
  templateUrl: './pet-hospitalized-service.component.html',
  styleUrls: ['./pet-hospitalized-service.component.scss']
})
export class PetHospitalizedServiceComponent implements OnInit {

  // variables
  idPet: string;
  client: Client;
  pet: Pet;

  hospitalizedServiceFormReg!: FormGroup;
  hospitalizedServices: PetHospitalizedService[] = [];

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
    this.initFormRegHospitalizedService();
    // get client
    this.client = this.getLocalStorageClient();
    // get pet
    this.getLocalStoragePet();
    this.getPet();
    // get pet's clinical histories
    this.getHospitalizedServicesByPet();
  }

  /* API METHODS */
  /* ----------------------- */

  // get pet's hospitalized services
  getHospitalizedServicesByPet() {
    this.spinnerStatus = true;
    this.petService.getHospitalizedServicesByPet(this.idPet).subscribe((res) => {
      // console.log(res);
      res['data'].forEach(phs => {
        phs.hospitalizedService.date = this.datePipe.transform(phs.hospitalizedService.date, "EEEE, dd 'de' MMMM 'del' y, h:mm a");
        phs.hospitalizedService.updated_at = this.datePipe.transform(phs.hospitalizedService.updated_at, "EEEE, dd 'de' MMMM 'del' y, h:mm a");
      });
      this.hospitalizedServices = res['data'];
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

  // register new hospitalized service
  registerHospitalizedService(dataHospitalizedService: HospitalizedService) {
    dataHospitalizedService.fk_id_pet = this.idPet;
    this.petService.postPetHospitalizedService(dataHospitalizedService).subscribe((res) => {
      console.log(res);
      this.switchToPetHospitalizedServicesList();
      this.getHospitalizedServicesByPet();
    }, (err) => {
      console.log(err);
    });
  }

  /* UI METHODS */
  /* ---------------------- */
  // variables
  switchHospitalizedServiceList = true;
  switchHospitalizedServiceFormReg = false;

  spinnerStatus = false;
  
  // methods
  switchToPetHospitalizedServicesList() {
    this.switchHospitalizedServiceList = true;
    this.switchHospitalizedServiceFormReg = false;
    this.initFormRegHospitalizedService();
  }

  switchToHospitalizedServiceForm() {
    this.switchHospitalizedServiceList = false;
    this.switchHospitalizedServiceFormReg = true;
    this.initFormRegHospitalizedService();
  }

  backToPets() {
    this.location.back();
  }

  // init form
  initFormRegHospitalizedService() {
    this.hospitalizedServiceFormReg = this.formBuilder.group({
      'diagnosis': ['',[Validators.required]],
      'description': ['',[]],
      'treatment': ['', [Validators.required]],
      'cost': ['', [Validators.required]],
      'weight': ['', [Validators.required]],
      'temperature': ['', [Validators.required]],
      'symptoms': ['', [Validators.required]],
      'observations': ['', []]
      // 'initial_date': ['', [Validators.required]],
      // 'final_date': ['', []],
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

  goToEditHospitalizedService(idHospitalizedService: string) {
    this.router.navigateByUrl('/home/editar-servicio-internado/' + idHospitalizedService);
  }

}
