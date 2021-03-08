import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForgotPasswordService } from "../../services/forgotPassword.service";

@Component({
  selector: 'app-forgot-password-update',
  templateUrl: './forgot-password-update.component.html',
  styleUrls: ['./forgot-password-update.component.scss']
})
export class ForgotPasswordUpdateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.verificationToken = this.activatedRoute.snapshot.paramMap.get('verification_token');
    this.initFormPasswordChange();
  }

  ngOnInit(): void {
  }

  /* API */
  // variables
  verificationToken: string;
  
  // methods
  updatePassword(data: any) {
    this.spinnerStatus = true;
    this.forgotPasswordService.changePassword(data.password, this.verificationToken).subscribe((res) => {
      console.log(res);
      this.spinnerStatus = false;
      alert('Contraseña actualizada satisfactoriamente');
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.log(err);
      alert('Este token ya expiró');
      this.spinnerStatus = false;
    });
  }

  /* UI */
  // variables
  updatePasswordForm: FormGroup;

  spinnerStatus = false;

  // methods
  initFormPasswordChange() {
    this.updatePasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

}
