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
  groupsUser = sessionStorage.getItem('groupsUser');
  statusUser = sessionStorage.getItem('statusUser');
  groupArr = this.groupsUser.split(',');

  // Creating new user
  pwdNew: string;
  emailNew: string;
  usernameNew: string;
  statusNew: string;
  newUser = {};
  allUsers = [];
  selectedGroup: string;

  userNameObj = {}; // For delete function

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
    console.log(this.groupsUser[0]);
    console.log(this.selectedGroup);
  }

  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data;
        this.statusNew = 'Regular';
    });
  }

  createUser() {
    this.newUser = {
      username: this.usernameNew,
      email: this.emailNew,
      pwd: this.pwdNew,
      status: this.statusNew
    };
    this.httpClient.post(BACKEND_URL + '/addUser', this.newUser)
      .subscribe((data: any) => {
        console.log('success');
    });
    this.pwdNew = '';
    this.emailNew = '';
    this.usernameNew = '';
    this.statusNew = '';
    this.getAllUsers();
  }

  // Eventually we need to get a callback function in here which can call getAllUsers();
  deleteUser(userID, callback) {
    this.userNameObj = {userID};
    this.httpClient.post(BACKEND_URL + '/deleteUser', this.userNameObj)
      .subscribe((data: any) => {
      console.log('success');
    });
    callback();
  }

  // Update later
  updateStatus() {
  }

  hasSlectedGroup() {
    if (this.selectedGroup == null) {
      return false;
    } else {
      return true;
    }
  }
}
