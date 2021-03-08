import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ClientService } from "../service/client.service";
import { Client } from '../interfaces/client.interface';

import { GlobalAuthService } from "../../../global/services/globalAuth.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  // vars
  clientFormReg!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private gAuthServ: GlobalAuthService
  ) { }

  ngOnInit(): void {
    // init form vet register
    this.initFormClientRegister();

    // get clients list all
    this.clientGetListAll();
  }

  /* filter vets */
  clients$: Observable<Client[]>;
  filter = new FormControl('');
  clients: Client[] = [];
  
  search(text: string): Client[] {
    return this.clients.filter(client => {
      const term = text.toLowerCase();
      return client.firstname.toLowerCase().includes(term)
        || client.lastname.toLowerCase().includes(term)
        || client.dni.includes(term)
        || client.phone.includes(term)
        || client.address.includes(term)
    });
  }
  /* -- */

  // switch page
  switchListclient = true;
  switchRegclient = false;

  spinnerStatus = false;

  /* UI methods */

  switchPageReg() {
    this.switchListclient = false;
    this.switchRegclient = true;
    this.initFormClientRegister();
  }

  switchPageList() {
    this.switchListclient = true;
    this.switchRegclient = false;
    this.initFormClientRegister();
  }

  initFormClientRegister() {
    this.clientFormReg = this.formBuilder.group({
      'firstname': ['',[Validators.required, Validators.minLength(3)]],
      'lastname': ['',[Validators.required, Validators.minLength(3)]],
      'dni': ['',[Validators.required, Validators.minLength(8)]],
      'phone': ['',[Validators.required, Validators.minLength(9)]],
      'address': ['',[Validators.required, Validators.minLength(3)]],
      'email': ['',[Validators.email, Validators.minLength(3)]],
      'password': ['',[Validators.minLength(3)]]
    });
  }

  /* API methods */

  // get client list
  clientGetListAll() {
    this.spinnerStatus = true;
    this.clientService.clientGetListAll().subscribe((res) => {
      // console.log(res);
      this.clients = res['data'];
      this.clients$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
      this.spinnerStatus = false;
      // this.gAuthServ.refreshToken();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  // register new client
  clientRegister(dataclient: Client) {
    this.spinnerStatus = true;
    this.clientService.clientRegister(dataclient).subscribe((res) => {
      // console.log(res);
      this.spinnerStatus = true;
      this.switchPageList();
      this.clientGetListAll();
      this.initFormClientRegister();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
