import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from '../../interfaces/client.interface';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.initFormUpdateFirst();
    // capture vet's id
    this.idClient = this.activatedRoute.snapshot.paramMap.get('id');
    // init form vet update
    this.getClient();
    // init form password
    this.initFormPassword();
  }

  ngOnInit(): void {
  }

  /* API METHODS */
  // variables
  clientFormUpdate: FormGroup;
  clientPasswordForm: FormGroup;
  idClient: string;
  client: Client;

  // methods
  updateClient(client: Client) {
    this.spinnerStatus = true;
    this.clientService.clientUpdate(client, this.idClient).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      this.router.navigateByUrl('/home/clientes');
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  updatePassword(data: any) {
    this.spinnerStatus = true;
    this.clientService.clientPasswordUpdate(data.password, this.idClient).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      // this.router.navigateByUrl('/home/clientes');
      alert('Se actualizó correctamente la contraseña');
      this.initFormPassword();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
      // if (err['status'] = 422) {
      //   this.initFormPassword();
      //   // alert('Contraseña actualizada satisfactoriamente');
      // }
    });
  }

  /* UI METHODS */
  // variables
  spinnerStatus = false;

  // methods
  initFormUpdate() {
    this.clientFormUpdate = this.formBuilder.group({
      'firstname': [this.client.firstname , [Validators.required, Validators.minLength(3)]],
      'lastname': [this.client.lastname, [Validators.required, Validators.minLength(3)]],
      'dni': [this.client.dni, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      'phone': [this.client.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      'address': [this.client.address, [Validators.required, Validators.minLength(3)]],
      'email': [this.client.email, [Validators.email, Validators.minLength(3)]]
    });
  }

  initFormUpdateFirst() {
    this.clientFormUpdate = this.formBuilder.group({
      'firstname': ['', [Validators.required, Validators.minLength(3)]],
      'lastname': ['', [Validators.required, Validators.minLength(3)]],
      'dni': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      'phone': ['', [Validators.required, Validators.minLength(9)]],
      'address': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.email, Validators.minLength(3)]]
    });
  }

  initFormPassword() {
    this.clientPasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getClient() {
    this.clientService.getCLient(this.idClient).subscribe((res) => {
      // console.log(res);
      this.client = res['data'];
      this.initFormUpdate();
    }, (err) => {
      console.log(err);
    });
  }

  backToClients() {
    this.router.navigateByUrl('/home/clientes');
  }

}
