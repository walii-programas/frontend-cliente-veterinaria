import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { PetService } from "../service/pet.service";
import { ClientService } from "../../client/service/client.service";
import { Pet } from '../interfaces/pet.interface';
import { Client } from "../../client/interfaces/client.interface";
// import { Location } from "@angular/common";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  // variables
  idClient: string = '';
  petFormReg!: FormGroup;
  client: Client;
  pets: Pet[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    // private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private clientService: ClientService,
    private datePipe: DatePipe
  ) {
    // get id_client on load
    this.idClient = this.activatedRoute.snapshot.paramMap.get('id') || '';
    // console.log(this.idClient);
  }

  ngOnInit(): void {
    // init form vet register
    this.initFormPetRegister();
    // get client
    this.getClient();
    // get client's pets
    this.petClientGetListAll();
  }
  
  /* UI methods */

  // switch page
  switchListpet = true;
  switchRegpet = false;

  spinnerStatusClient = false;
  spinnerStatus = false;

  switchPetReg() {
    this.switchListpet = false;
    this.switchRegpet = true;
    this.initFormPetRegister();
  }

  switchPetList() {
    this.switchListpet = true;
    this.switchRegpet = false;
    this.initFormPetRegister();
  }

  // change route to clinical histories
  goToPetClinicalHistory(idPet: string) {
    this.router.navigateByUrl(`/home/historial-clinico/${idPet}`);
  }
  // change route to vaccination cards
  goToPetVaccinationCards(idPet: string) {
    this.router.navigateByUrl(`/home/tarjeta-vacunas/${idPet}`);
  }
  // change route to simple services
  goToPetSimpleServices(idPet: string) {
    this.router.navigateByUrl(`/home/servicios-simples/${idPet}`);
  }
  // change route to hospitalized services
  goToPetHospitalizedServices(idPet: string) {
    this.router.navigateByUrl(`/home/servicios-hospitalizacion/${idPet}`);
  }

  // init form
  initFormPetRegister() {
    this.petFormReg = this.formBuilder.group({
      'name': ['',[Validators.required, Validators.minLength(3)]],
      'species': ['',[Validators.required, Validators.minLength(3)]],
      'breed': ['',[Validators.required, Validators.minLength(3)]],
      'color': ['',[Validators.required, Validators.minLength(3)]],
      'birthdate': ['',[Validators.required]],
      'sex': ['',[Validators.required]],
      // 'photo': ['',[Validators.required, Validators.minLength(3)]]
    });
  }

  /* API methods */

  // get client's pet list
  petClientGetListAll() {
    this.spinnerStatus = true;
    this.petService.petsClientGetListAll(this.idClient).subscribe((res) => {
      // console.log(res);
      res['data'].forEach(pet => {
        pet.birthdate = this.datePipe.transform(pet.birthdate, "EEEE, dd 'de' MMMM 'del' y")
      });
      this.pets = res['data'];
      localStorage.setItem('pets/' + this.idClient, JSON.stringify(this.pets));
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  // get client
  getClient() {
    this.spinnerStatusClient = true;
    this.clientService.getCLient(this.idClient).subscribe((res) => {
      // console.log(res);
      this.client = res['data'];
      localStorage.setItem('clientSelected', JSON.stringify(this.client));
      this.spinnerStatusClient = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatusClient = false;
    });
  }

  // register new pet
  petRegister(datapet: Pet) {
    datapet.fk_id_user = this.idClient
    this.petService.petRegister(datapet).subscribe((res) => {
      // console.log(res);
      this.switchPetList();
      this.petClientGetListAll();
    }, (err) => {
      console.log(err);
    });
  }

}
