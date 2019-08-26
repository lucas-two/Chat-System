import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usernameUser = sessionStorage.getItem('usernameUser');
  statusUser = sessionStorage.getItem('statusUser');

  // Creating new user
  idNew: number;
  pwdNew: string;
  emailNew: string;
  usernameNew: string;
  statusNew: string;
  newUser = {};

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
  }

  createUser() {
    this.newUser = {
      idNew: this.idNew,
      pwdNew: this.pwdNew,
      emailNew: this.emailNew,
      usernameNew: this.usernameNew,
      statusNew: this.statusNew
    };
    this.httpClient.post(BACKEND_URL + '/addUser', this.newUser);
  }
}
