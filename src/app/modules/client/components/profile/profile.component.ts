import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/global/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  /* UI */
  // variables
  user: User;

}
