import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalAuthService } from "../../../global/services/globalAuth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private gAuthService: GlobalAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /* variables */
  spinnerStatus = false;

  /* methods */
  logout() {
    this.spinnerStatus = true;
    this.gAuthService.logout().subscribe((res) => {
      console.log(res);
      localStorage.clear();
      this.spinnerStatus = false;
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.log(err);
      if (err.status == 401) {
        this.router.navigateByUrl('/login');
      }
      this.spinnerStatus = false;
    });
  }

}
