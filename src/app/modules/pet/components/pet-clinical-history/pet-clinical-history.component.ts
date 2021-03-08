import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PetService } from "../../service/pet.service";
import { PetClinicalHistory } from '../../interfaces/petClinicalHistory.interface';
import { Client } from "../../../client/interfaces/client.interface";
import { Pet } from '../../interfaces/pet.interface';
import { Location } from "@angular/common";

@Component({
  selector: 'app-pet-clinical-history',
  templateUrl: './pet-clinical-history.component.html',
  styleUrls: ['./pet-clinical-history.component.scss']
})
export class PetClinicalHistoryComponent implements OnInit {

  // variables
  idPet: string;
  client: Client;
  pet: Pet;

  clinicalHistoryFormReg!: FormGroup;
  clinicalHistories: PetClinicalHistory[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private petService: PetService
  ) {
    // get id_client on load
    this.idPet = this.activatedRoute.snapshot.paramMap.get('id') || '';
    // this.idPet = this.activatedRoute.pathFromRoot[2].snapshot.paramMap.get('id');
    // console.log(this.idPet);
    // console.log(this.activatedRoute.pathFromRoot[2].snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    // init form vet register
    this.initFormRegClinialHistory();
    // get client
    this.client = this.getLocalStorageClient();
    // get pet
    this.getLocalStoragePet();
    this.getPet();
    // get pet's clinical histories
    this.clinicalHistoryGetListAll();
  }

  // switch page
  switchListclinicalhistory = true;
  switchRegclinicalhistory = false;

  spinnerStatus = false;

  // UI methods--

  switchPetClinicalHistoryReg() {
    this.switchListclinicalhistory = false;
    this.switchRegclinicalhistory = true;
    this.initFormRegClinialHistory();
  }

  switchPetClinicalHistoryList() {
    this.switchListclinicalhistory = true;
    this.switchRegclinicalhistory = false;
    this.initFormRegClinialHistory();
  }

  backToPets() {
    this.location.back();
  }

  // init form
  initFormRegClinialHistory() {
    this.clinicalHistoryFormReg = this.formBuilder.group({
      'weight': ['',[Validators.required]],
      'temperature': ['',[Validators.required]],
      'observations': ['']
    });
  }

  // get client from local storage
  getLocalStorageClient() {
    return JSON.parse(localStorage.getItem('clientSelected'))[0];
  }

  // get pet from local storage
  getLocalStoragePet() {
    JSON.parse(localStorage.getItem('pets/' + this.client.id)).forEach(pet => {
      if (pet.id == this.idPet) {
        this.pet = pet;
      }
    });
  }

  /* API methods */

  // get pet's clinical history
  clinicalHistoryGetListAll() {
    this.spinnerStatus = true;
    this.petService.getPetClinicalHistoriesByPet(this.idPet).subscribe((res) => {
      // console.log(res);
      this.clinicalHistories = res['data'];
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

  // register new clinical history
  clinicalHistoryRegister(dataPetClinicalHistory: PetClinicalHistory) {
    dataPetClinicalHistory.fk_id_pet = this.idPet;
    this.petService.postPetClinicalHistory(dataPetClinicalHistory).subscribe((res) => {
      console.log(res);
      this.switchPetClinicalHistoryList();
      this.clinicalHistoryGetListAll();
    }, (err) => {
      console.log(err);
    });
  }

}
