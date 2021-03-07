import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/global/interfaces/pet.interface';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  constructor(
    private petService: PetService,
    private datePipe: DatePipe
  ) {
    this.getPets();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  pets: Pet[];
  spinnerStatus = false;
  // methods
  getPets() {
    this.spinnerStatus = true;
    this.petService.getPetsByClient(localStorage.getItem('idUser').toString()).subscribe((res) => {
      this.spinnerStatus = false;
      res['data'].forEach(pet => {
        pet.birthdate = this.datePipe.transform(pet.birthdate, "dd 'de' MMMM 'del' y")
      });
      this.pets = res['data'];
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
