import { Component, OnInit } from '@angular/core';
import { user } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = user;
  constructor() { }

  ngOnInit() {
  }

}
