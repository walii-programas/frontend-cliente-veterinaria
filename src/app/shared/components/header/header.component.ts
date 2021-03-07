import { Component, OnInit } from '@angular/core';
import { GlobalAuthService } from "../../../global/services/globalAuth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private gAuthServ: GlobalAuthService
  ) {
    // this.loginStatus = this.gAuthServ.getLoginStatus();
    this.checkStatusLogin();
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  loginStatus = false;

  methods
  checkStatusLogin() {
    setInterval(() => {
    this.loginStatus = this.gAuthServ.getLoginStatus();
  }, 2000);
  }

}
