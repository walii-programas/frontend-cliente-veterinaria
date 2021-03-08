import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { VetService } from "../service/vet.service";
import { Vet, VetListAll } from '../interfaces/vet.interface';

// function search(text: string, pipe: PipeTransform): Country[] {
//   return COUNTRIES.filter(country => {
//     const term = text.toLowerCase();
//     return country.name.toLowerCase().includes(term)
//         || pipe.transform(country.area).includes(term)
//         || pipe.transform(country.population).includes(term);
//   });
// }

// ----------------------------------------------

@Component({
  selector: 'app-vet',
  templateUrl: './vet.component.html',
  styleUrls: ['./vet.component.scss']
})
export class VetComponent implements OnInit {

  // variables
  vetFormReg!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vetService: VetService
  ) { }

  ngOnInit(): void {
    // init form vet register
    this.initFormVetRegister();

    // get vets list
    this.vetGetListAll();
  }

  // filter vets
  vets$: Observable<Vet[]>;
  filter = new FormControl('');
  vets: Vet[] = [];
  
  search(text: string): Vet[] {
    return this.vets.filter(vet => {
      const term = text.toLowerCase();
      return vet.firstname.toLowerCase().includes(term)
      || vet.lastname.toLowerCase().includes(term)
      || vet.dni.includes(term)
      || vet.phone.includes(term)
      || vet.cmvp.includes(term)
    });
  }
  // -----------------
  
  // switch page
  switchListVet = true;
  switchRegVet = false;

  spinnerStatus = false;

  /* UI methods */

  switchPageReg() {
    this.switchListVet = false;
    this.switchRegVet = true;
    this.initFormVetRegister();
  }

  switchPageList() {
    this.switchListVet = true;
    this.switchRegVet = false;
    this.initFormVetRegister();
  }

  initFormVetRegister() {
    this.vetFormReg = this.formBuilder.group({
      'firstname': ['',[Validators.required, Validators.minLength(3)]],
      'lastname': ['',[Validators.required, Validators.minLength(3)]],
      'dni': ['',[Validators.required, Validators.minLength(8)]],
      'phone': ['',[Validators.required, Validators.minLength(9)]],
      'address': ['',[Validators.required, Validators.minLength(3)]],
      'email': ['',[Validators.required, Validators.email, Validators.minLength(3)]],
      'password': ['',[Validators.required, Validators.minLength(3)]],
      'cmvp': ['',[Validators.required]]
    });
  }

  goToEditVet(idVet: string) {
    this.router.navigateByUrl('/home/editar-veterinario/' + idVet);
  }

  /* API methods */

  // get vet list
  vetGetListAll() {
    this.spinnerStatus = true;
    this.vetService.vetGetListAll().subscribe((res) => {
      // console.log(res);
      this.vets = res['data'];
      this.vets$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  // register new vet
  vetRegister(dataVet: Vet) {
    console.log(dataVet)
    this.vetService.vetRegister(dataVet).subscribe((res) => {
      // console.log(res);
      this.switchPageList();
      this.vetGetListAll();
      this.initFormVetRegister();
    }, (err) => {
      console.log(err);
    });
  }
}
