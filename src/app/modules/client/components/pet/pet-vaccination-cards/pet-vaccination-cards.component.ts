import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { Pet } from 'src/app/global/interfaces/pet.interface';
import { dataPetVaccinationCardAndDetail } from '../../../interfaces/dataPetVaccinationCardAndDetail.interface';
import { PetService } from '../../../services/pet.service';
import { PetVaccinationCardService } from '../../../services/petVaccinationCard.service';

@Component({
  selector: 'app-pet-vaccination-cards',
  templateUrl: './pet-vaccination-cards.component.html',
  styleUrls: ['./pet-vaccination-cards.component.scss']
})
export class PetVaccinationCardsComponent implements OnInit {

  constructor(
    config: NgbAccordionConfig,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private petService: PetService,
    private petVaccinationCardService: PetVaccinationCardService,
    private datePipe: DatePipe
  ) {
    config.closeOthers = true;
    config.type = 'primaryBG';
    this.idPet = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPet();
    this.getPetVaccinationCardByPet();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  idPet: string;
  pet: Pet;
  petVaccinationCardsAndDetails: dataPetVaccinationCardAndDetail[];
  spinnerStatus = false;

  // methods
  getPet() {
    this.petService.getPet(this.idPet).subscribe((res) => {
      // console.log(res);
      this.pet = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

  getPetVaccinationCardByPet() {
    this.spinnerStatus = true;
    this.petVaccinationCardService.getVaccinationCardByPet(this.idPet).subscribe((res) => {
      // console.log(res);
      res['data'].forEach(pvc => {
        pvc.petVaccinationCard.date = this.datePipe.transform(pvc.petVaccinationCard.date, "EEEE, dd 'de' MMMM 'del' y");
        pvc.vaccines.forEach(vaccine => {
          vaccine.pivot.date = this.datePipe.transform(vaccine.pivot.date, "EEEE, dd 'de' MMMM 'del' y")
        });
      });
      this.spinnerStatus = false;
      this.petVaccinationCardsAndDetails = res['data'];
      // console.log(this.petVaccinationCardsAndDetails);
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  backToPets() {
    this.location.back();
  }

}
