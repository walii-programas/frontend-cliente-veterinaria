import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { Pet } from 'src/app/global/interfaces/pet.interface';
import { DataSimpleServices } from '../../../interfaces/dataSimpleService.interface';
import { PetService } from '../../../services/pet.service';
import { PetSimpleService } from '../../../services/petSimpleService.service';

@Component({
  selector: 'app-pet-simple-services',
  templateUrl: './pet-simple-services.component.html',
  styleUrls: ['./pet-simple-services.component.scss']
})
export class PetSimpleServicesComponent implements OnInit {

  constructor(
    config: NgbAccordionConfig,
    private petSimpleService: PetSimpleService,
    private activatedRoute: ActivatedRoute,
    private petService: PetService,
    private datePipe: DatePipe,
    private location: Location
  ) {
    // customize default values of accordion
    config.closeOthers = true;
    config.type = 'primaryBG';
    // get id pet
    this.idPet = this.activatedRoute.snapshot.paramMap.get('id');
    // get pet
    this.getPet();
    // get simple services
    this.getSimpleServicesByPet();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  idPet: string;
  pet: Pet = undefined;
  simpleServices: DataSimpleServices[];
  // methods
  getSimpleServicesByPet() {
    this.petSimpleService.getSimpleSericesByPet(this.idPet).subscribe((res) => {
      // console.log(res);
      res['data'].forEach(pss => {
        pss.simpleService.date = this.datePipe.transform(pss.simpleService.date, "EEEE, dd 'de' MMMM 'del' y, h:mm a");
      });
      this.simpleServices = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

  getPet() {
    this.petService.getPet(this.idPet).subscribe((res) => {
      console.log(res);
      this.pet = res['data'];
    }, (err) => {
      console.log(err);
    });
  }

  backToPets() {
    this.location.back();
  }

}
