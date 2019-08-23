import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usernameUser = sessionStorage.getItem('usernameUser');
  idUser = sessionStorage.getItem('idUser');
  ageUser = sessionStorage.getItem('ageUser');
  birthdateUser = sessionStorage.getItem('birthdateUser');
  emailUser = sessionStorage.getItem('emailUser');
  constructor() { }

  ngOnInit() {
  }

}
