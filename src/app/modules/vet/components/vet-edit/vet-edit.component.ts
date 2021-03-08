import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VetService } from "../../service/vet.service";
import { RoleService } from "../../../role/services/role.service";
import { Vet, VetRoles } from '../../interfaces/vet.interface';
import { Role } from 'src/app/modules/role/interfaces/role.interface';

@Component({
  selector: 'app-vet-edit',
  templateUrl: './vet-edit.component.html',
  styleUrls: ['./vet-edit.component.scss']
})
export class VetEditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private vetService: VetService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.initFormUpdateFirst();
    // capture vet's id
    this.idVet = this.activatedRoute.snapshot.paramMap.get('id');
    // init form vet update
    this.getVet();
    // get all roles
    this.getRoles();
    // init form password
    this.initFormPassword();  
  }

  ngOnInit(): void {
  }

  /* API METHODS */
  // variables
  vetFormUpdate: FormGroup;
  vetPasswordForm: FormGroup;
  idVet: string;
  vet: Vet;
  allRoles: Role[] = [];
  roles: VetRoles[] = [];

  // methods
  updateVet(vet: Vet) {
    this.spinnerStatus = true;
    this.vetService.vetUpdate(vet, this.idVet).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      this.router.navigateByUrl('/home/veterinarios');
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  updatePassword(data: any) {
    this.spinnerStatus = true;
    this.vetService.vetPasswordUpdate(data.password, this.idVet).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      // this.router.navigateByUrl('/home/veterinarios');
      alert('Se actualizó correctamente la contraseña');
      this.initFormPassword();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
      // if (err['status'] = 422) {
      //   this.initFormPassword();
      //   alert('Contraseña actualizada satisfactoriamente');
      // }
    });
  }

  asignRole(idRole: string) {
    this.spinnerStatus = true;
    this.vetService.asignRole(this.idVet, idRole).subscribe((res) => {
      console.log(res);
      this.getVetRoles();
      this.getRoles();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  denyRole(idRole: string) {
    this.spinnerStatus = true;
    this.vetService.denyRole(this.idVet, idRole).subscribe((res) => {
      console.log(res);
      this.getVetRoles();
      this.getRoles();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  /* UI METHODS */
  // variables
  spinnerStatus = false;

  // methods
  initFormUpdate() {
    this.vetFormUpdate = this.formBuilder.group({
      'firstname': [this.vet.firstname , [Validators.required, Validators.minLength(3)]],
      'lastname': [this.vet.lastname, [Validators.required, Validators.minLength(3)]],
      'dni': [this.vet.dni, [Validators.required, Validators.minLength(8)]],
      'phone': [this.vet.phone, [Validators.required, Validators.minLength(9)]],
      'address': [this.vet.address, [Validators.required, Validators.minLength(3)]],
      'email': [this.vet.email, [Validators.required, Validators.email, Validators.minLength(3)]],
      // 'password': [this.vet.password, [Validators.required, Validators.minLength(3)]],
      'cmvp': [this.vet.cmvp, [Validators.required]]
    });
  }

  initFormUpdateFirst() {
    this.vetFormUpdate = this.formBuilder.group({
      'firstname': ['', [Validators.required, Validators.minLength(3)]],
      'lastname': ['', [Validators.required, Validators.minLength(3)]],
      'dni': ['', [Validators.required, Validators.minLength(8)]],
      'phone': ['', [Validators.required, Validators.minLength(9)]],
      'address': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      // 'password': ['', [Validators.required, Validators.minLength(3)]],
      'cmvp': ['', [Validators.required]]
    });
  }

  initFormPassword() {
    this.vetPasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getVet() {
    this.vetService.getVet(this.idVet).subscribe((res) => {
      console.log(res);
      this.vet = res['data'];
      this.initFormUpdate();
      this.getVetRoles();
    }, (err) => {
      console.log(err);
    });
  }

  getVetRoles() {
    this.spinnerStatus = true;
    this.vetService.getVetRoles(this.idVet).subscribe((res) => {
      console.log(res);
      this.roles = res['data'];
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    })
  }

  getRoles() {
    this.spinnerStatus = true;
    this.roleService.getRoles().subscribe((res) => {
      console.log(res);
      this.allRoles = res['data'];
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

  validateRoles(rolName: string): boolean {
    let item = this.roles.find(rolObject => rolObject.name == rolName);
    if (item == undefined) {
      return true
    } else {
      return false;
    }
  }

  backToVets() {
    this.router.navigateByUrl('/home/veterinarios');
  }

}
