import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Location, DatePipe } from "@angular/common";

import { PetService } from "../../service/pet.service";
import { VaccineService } from "../../../vaccine/service/vaccine.service";

import { Pet } from '../../interfaces/pet.interface';
import { Client } from "../../../client/interfaces/client.interface";
import { PetVaccinationCard, PetVaccinationCardAndVaccines } from '../../interfaces/petVaccinationCard.interface';
import { Vaccine } from "../../../vaccine/interfaces/vaccine.interface";
import { PetVaccinationCardDetails } from '../../interfaces/petVaccinationCardDetails.interface';

@Component({
  selector: 'app-pet-vaccination-card',
  templateUrl: './pet-vaccination-card.component.html',
  styleUrls: ['./pet-vaccination-card.component.scss']
})
export class PetVaccinationCardComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private vaccineService: VaccineService,
    private datePipe: DatePipe
  ) {
    // get id_pet on load
    this.idPet = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    // init form vaccines add
    this.initFormVaccinesAdd();
    // init form vet register
    this.initFormRegVaccinationCard();
    // get client
    this.client = this.getLocalStorageClient();
    // get pet
    this.getLocalStoragePet();
    this.getPet();
    // get pet's clinical histories
    this.vaccinationCardGetListAll();
    // get vaccines list
    this.getVaccines();
  }

  /* VACCINATION CARD */
  /* ------------------------------------------------------------------ */

  // vaccination card variables
  vaccinationCardFormReg: FormGroup;
  vaccinationCards: PetVaccinationCardAndVaccines[] = [];
  vaccinationCardSelected: PetVaccinationCard;

  // init vaccination card form
  initFormRegVaccinationCard() {
    this.vaccinationCardFormReg = this.formBuilder.group({
      'description': ['',[Validators.required]],
      // 'cost': ['',[Validators.required]]
    });
  }

  // get pet's vaccination card
  vaccinationCardGetListAll() {
    this.spinnerStatus = true;
    this.petService.getPetVaccinationCardsByPet(this.idPet).subscribe((res) => {
      console.log(res);
      res['data'].forEach(pvc => {
        pvc.petVaccinationCard.date = this.datePipe.transform(pvc.petVaccinationCard.date, "EEEE, dd 'de' MMMM 'del' y");
        pvc.vaccines.forEach(vaccine => {
          vaccine.pivot.dateForPipe = this.datePipe.transform(vaccine.pivot.date, "EEEE, dd 'de' MMMM 'del' y")
        });
      });
      this.vaccinationCards = res['data'];
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  // register new vaccination-card
  vaccinationCardRegister(dataPetVaccinationCard: PetVaccinationCard) {
    dataPetVaccinationCard.fk_id_pet = this.idPet;
    this.petService.postPetVaccinationCard(dataPetVaccinationCard).subscribe((res) => {
      console.log(res);
      this.vaccinationCardSelected = res['data'];
      this.switchToAddVaccinesForm();
      // this.vaccines = [];
      // this.initFormVaccinesAdd();
      this.initFormRegVaccinationCard();
      // this.switchToPetVaccinationCardList();
      this.vaccinationCardGetListAll();
    }, (err) => {
      console.log(err);
    });
  }

  selectPetVaccinationCard(PetVaccinationCard: PetVaccinationCard) {
    this.vaccinationCardSelected = PetVaccinationCard;
    this.getVaccinationCardsDetailsByPVC();
    this.switchToPetVaccinationCardReg();
    this.switchToAddVaccinesForm();
  }



  /* PET VACCINATION CARD DETAILS */
  /* ------------------------------------------------------------------ */
  
  // vaccines variables
  vaccineFormAdd: FormGroup;
  petVaccinationCardsDetails: PetVaccinationCardDetails[] = [];

  // init vaccines form
  initFormVaccinesAdd() {
    this.vaccineFormAdd = this.formBuilder.group({
      'fk_id_vaccine': ['',[Validators.required]],
      'date': ['',[Validators.required]]
    });
  }

  // get vaccination cards details
  getVaccinationCardsDetailsByPVC() {
    this.spinnerAddVaccinesStatus = true;
    this.petService.getVaccinationCardsDetailsByPvc(this.vaccinationCardSelected).subscribe((res) => {
      console.log(res);
      res['data'].forEach(vcd => {
        vcd.pivot.dateForPipe = this.datePipe.transform(vcd.pivot.date, "EEEE, dd 'de' MMMM 'del' y");
      });
      this.petVaccinationCardsDetails = res['data'];
      this.spinnerAddVaccinesStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerAddVaccinesStatus = false;
    });
  }

  addVaccine(dataVaccine: PetVaccinationCardDetails) {
    this.spinnerAddVaccinesStatus = true;
    this.petService.postVaccineToPetVaccinationCard(
      dataVaccine,
      this.vaccinationCardSelected
    ).subscribe((res) => {
      // console.log(res);
      this.getVaccinationCardsDetailsByPVC();
      this.initFormVaccinesAdd();
      // this.spinnerAddVaccinesStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerAddVaccinesStatus = false;
    });
  }

  // addVaccine(dataVaccine: PetVaccinationCardDetails) {
  //   if (this.petVaccinationCardsDetails.length == 8) {
  //     alert('No se puede agregar más de 8 vacunas');
  //     this.initFormVaccinesAdd();
  //   } else {
  //     this.petVaccinationCardsDetails.push(dataVaccine);
  //     console.log(this.petVaccinationCardsDetails);
  //     this.initFormVaccinesAdd();
  //   }
  // }

  // removeVaccine(fk_id_vaccine) {
  //   console.log(fk_id_vaccine);
  //   let index = this.petVaccinationCardsDetails.indexOf(fk_id_vaccine);
  //   if (index == -1) {
  //     this.petVaccinationCardsDetails.splice(index-1, 1);
  //     console.log(this.petVaccinationCardsDetails);
  //   }
  // }

  removeVaccine(fk_id_vaccine, date) {
    // console.log(fk_id_vaccine);
    let index = this.petVaccinationCardsDetails.indexOf(fk_id_vaccine);
    if (index == -1) {
      this.petService.deleteVaccineFromPetVaccinationCard(
        fk_id_vaccine,
        date,
        this.vaccinationCardSelected
      ).subscribe((res) => {
        console.log(res);
        this.getVaccinationCardsDetailsByPVC();
      }, (err) => {
        console.log(err);
      });
    }
  }

  updatePvcDetail(
    vaccine: PetVaccinationCardDetails,
    petVaccinationCard: PetVaccinationCard
  ) {
    this.updatingVaccineState = true;
    this.vaccinationCardSelected = petVaccinationCard;
    this.petService.putVaccineFromPetVaccinationCard(
      vaccine.pivot.vaccine_id,
      vaccine.pivot.date,
      petVaccinationCard
    ).subscribe((res) => {
      console.log(res);
      this.vaccinationCardGetListAll();
      this.updatingVaccineState = false;
    }, (err) => {
      console.log(err);
      this.updatingVaccineState = false;
    });
  }


  
  /* UI */
  /* ------------------------------------------------------------------ */

  // UI variables
  idPet: string;
  client: Client;
  pet: Pet;
  vaccines: Vaccine[] = [];

  switchListvaccinationCard = true;
  switchRegvaccinationCard = false;
  switchToAddVaccines = false;

  spinnerStatus = false;
  updatingVaccineState = false;
  spinnerAddVaccinesStatus = false;

  // UI methods--

  switchToPetVaccinationCardReg() {
    this.switchListvaccinationCard = false;
    this.switchRegvaccinationCard = true;
    this.initFormRegVaccinationCard();
    this.initFormVaccinesAdd();
    this.switchToAddVaccines = false;
  }

  switchToPetVaccinationCardList() {
    this.vaccinationCardGetListAll();
    this.switchListvaccinationCard = true;
    this.switchRegvaccinationCard = false;
    this.initFormRegVaccinationCard();
    this.initFormVaccinesAdd();
    this.switchToAddVaccines = false;
  }

  switchToAddVaccinesForm() {
    this.switchListvaccinationCard = false;
    this.switchRegvaccinationCard = false;
    this.initFormRegVaccinationCard();
    this.initFormVaccinesAdd();
    this.switchToAddVaccines = true;
  }

  backToPets() {
    this.location.back();
  }

  // get pet from api
  getPet() {
    this.petService.getPet(this.idPet).subscribe((res) => {
      // console.log(res);
      this.pet = res['data'];
      localStorage.setItem('petSelected', JSON.stringify(this.pet));
    }, (err) => {
      console.log(err);
    });
  }

  // get pet from local storage
  getLocalStoragePet() {
    JSON.parse(localStorage.getItem('pets/' + this.client.id)).forEach(pet => {
      if (pet.id == this.idPet) {
        this.pet = pet;
      }
    });
  }

  // get client from local storage
  getLocalStorageClient() {
    return JSON.parse(localStorage.getItem('clientSelected'));
  }

  // get vaccines
  getVaccines() {
    this.vaccineService.getVaccines().subscribe((res) => {
      // console.log(res);
      this.vaccines = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

  statePvcVaccine(state: string): boolean {
    if (state == 'No vacunado') {
      return true;
    } else if (state == 'Vacunado') {
      return false;
    }
    return false;
  }

}
