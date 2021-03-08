import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";
import { RoleService } from "../services/role.service";
import { Role } from '../interfaces/role.interface';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  // variables
  roleFormReg!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    // init form vaccine register
    this.initFormRoleRegister();

    // get vaccines list
    this.roleGetAll();
  }

  // filter roles
  roles$: Observable<Role[]>;
  filter = new FormControl('');
  roles: Role[] = [];
  
  search(text: string): Role[] {
    return this.roles.filter(vet => {
      const term = text.toLowerCase();
      return vet.name.toLowerCase().includes(term)
    });
  }
  // -----------------
  
  // switch page
  switchListRole = true;
  switchRegRole = false;

  spinnerStatus = false;

  /* UI methods */

  switchPageReg() {
    this.switchListRole = false;
    this.switchRegRole = true;
    this.initFormRoleRegister();
  }

  switchPageList() {
    this.switchListRole = true;
    this.switchRegRole = false;
    this.initFormRoleRegister();
  }

  initFormRoleRegister() {
    this.roleFormReg = this.formBuilder.group({
      'name': ['',[Validators.required, Validators.minLength(3)]]
    });
  }

  /* API methods */

  // get all roles list
  roleGetAll() {
    this.spinnerStatus = true;
    this.roleService.getRoles().subscribe((res) => {
      // console.log(res);
      this.roles = res['data'];
      this.roles$ = this.filter.valueChanges.pipe(
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
  roleRegister(dataRole: Role) {
    this.spinnerStatus = true;
    this.roleService.postRole(dataRole).subscribe((res) => {
      // console.log(res);
      this.spinnerStatus = false;
      this.switchPageList();
      this.roleGetAll();
      this.initFormRoleRegister();
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
