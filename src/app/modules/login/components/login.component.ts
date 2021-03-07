import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";
import { Login } from "../interfaces/login.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private gAuthServ: GlobalAuthService,
    private router: Router
  ) {
    this.initFormLogin();
  }

  ngOnInit(): void {
  }

  /* API */
  // variables
  loginForm: FormGroup;

  // methods
  login(dataLogin: Login) {
    this.spinnerStatus = true;
    this.loginService.login(dataLogin).subscribe((res) => {
      // console.log(res);
      if (res['client'] == true) {
        this.gAuthServ.calcExpiresIn(res['expires_in']);
        localStorage.setItem('expires_in', (this.gAuthServ.currentLoginStatus).toString());
        localStorage.setItem('token', res['access_token']);
        localStorage.setItem('idUser', res['user'].id);
        localStorage.setItem('user', JSON.stringify(res['user']));
        this.spinnerStatus = false;
        this.router.navigateByUrl('/cliente/mi-perfil');
      } else {
        this.spinnerStatus = false;
        alert('Este usuario no está autorizado');
      }
      this.spinnerStatus = false;
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
      alert('Credenciales incorrectas');
    });
  }

  /* UI */
  // variables
  spinnerStatus = false;

  // methods
  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

}
