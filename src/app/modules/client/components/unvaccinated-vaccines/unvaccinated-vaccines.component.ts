import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { dataUnvaccinatedVaccines } from '../../interfaces/dataUnvaccinatedVaccines.interface';
import { UnvaccinatedVaccineService } from '../../services/unvaccinated-vaccine.service';

@Component({
  selector: 'app-unvaccinated-vaccines',
  templateUrl: './unvaccinated-vaccines.component.html',
  styleUrls: ['./unvaccinated-vaccines.component.scss']
})
export class UnvaccinatedVaccinesComponent implements OnInit {

  constructor(
    private unvaccinatedVaccineService: UnvaccinatedVaccineService,
    private datePipe: DatePipe
  ) {
    this.getUnvaccinatedVaccines();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  unvaccinatedVaccines: dataUnvaccinatedVaccines[];
  spinnerStatus = false;

  // methods
  getUnvaccinatedVaccines() {
    this.spinnerStatus = true;
    this.unvaccinatedVaccineService.getUnvaccinatedVaccinesByClient().subscribe((res) => {
      // console.log(res);
      res['data'].forEach(uVaccine => {
        uVaccine.pet_vaccination_card_vaccine_date = this.datePipe.transform(uVaccine.pet_vaccination_card_vaccine_date, "EEEE, dd 'de' MMMM 'del' y");
      });
      this.unvaccinatedVaccines = res['data'];
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
