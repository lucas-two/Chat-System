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
  userCreated: boolean;
  allUsers = [];

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data;
        this.idNew = this.allUsers.length + 1;
    });
  }

  createUser() {
    this.newUser = {
      id: this.idNew,
      username: this.usernameNew,
      email: this.emailNew,
      pwd: this.pwdNew,
      status: this.statusNew
    };
    this.httpClient.post(BACKEND_URL + '/addUser', this.newUser)
      .subscribe((data: any) => {
        console.log('success');
    });
    this.userCreated = true;
    this.idNew = this.idNew;
    this.pwdNew = '';
    this.emailNew = '';
    this.usernameNew = '';
    this.statusNew = '';
    this.getAllUsers();
  }
}