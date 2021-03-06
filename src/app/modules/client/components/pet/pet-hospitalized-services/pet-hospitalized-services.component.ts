import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { Pet } from 'src/app/global/interfaces/pet.interface';
import { DataHospitalizedService } from '../../../interfaces/dataHospitalizedServices.interface';
import { PetHospitalizedService } from '../../../services/petHospitalizedService.service';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-pet-hospitalized-services',
  templateUrl: './pet-hospitalized-services.component.html',
  styleUrls: ['./pet-hospitalized-services.component.scss']
})
export class PetHospitalizedServicesComponent implements OnInit {

  constructor(
    config: NgbAccordionConfig,
    private petHospitalizedService: PetHospitalizedService,
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
    this.getHospitalizedServicesByPet();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  idPet: string;
  pet: Pet = undefined;
  hospitalizedServices: DataHospitalizedService[];
  // methods
  getHospitalizedServicesByPet() {
    this.petHospitalizedService.getHospitalizedServicesByPet(this.idPet).subscribe((res) => {
      // console.log(res);
      res['data'].forEach(phs => {
        phs.hospitalizedService.date = this.datePipe.transform(phs.hospitalizedService.date, "EEEE, dd 'de' MMMM 'del' y, h:mm a");
        phs.hospitalizedService.updated_at = this.datePipe.transform(phs.hospitalizedService.updated_at, "EEEE, dd 'de' MMMM 'del' y, h:mm a");
      });
      this.hospitalizedServices = res['data'];
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
