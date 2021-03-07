import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalAuthService } from 'src/app/global/services/globalAuth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private gAuthService: GlobalAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  spinnerStatus = false;

  // methods
  logout() {
    this.spinnerStatus = true;
    this.gAuthService.logout().subscribe((res) => {
      console.log(res);
      localStorage.clear();
      this.spinnerStatus = false;
      this.router.navigateByUrl('/inicio');
      window.location.reload();
    }, (err) => {
      console.log(err);
      if (err.status == 401) {
        this.router.navigateByUrl('/inicio');
      }
      this.spinnerStatus = false;
    });
  }

}
