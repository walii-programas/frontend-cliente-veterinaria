import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ForgotPasswordService } from '../services/forgotPassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.initFormRequestPasswordChange();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  requestPasswordChangeForm: FormGroup;

  spinnerStatus = false;

  // methods
  initFormRequestPasswordChange() {
    this.requestPasswordChangeForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]]
    });
  }

  /* API */

  // methods
  requestPasswordChange(data: any) {
    this.spinnerStatus = true;
    this.forgotPasswordService.requestPasswordChange(data.email).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      alert('Verifique su correo electrónico');
      this.initFormRequestPasswordChange();
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.log(err);
      this.spinnerStatus = false;
    });
  }

}
