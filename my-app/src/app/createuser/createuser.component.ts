import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  // Get user details from session storage
  usernameUser = sessionStorage.getItem('usernameUser');
  statusUser = sessionStorage.getItem('statusUser');
  groupUser = JSON.parse(sessionStorage.getItem('groupsUser'));

  // Storing new user
  pwdNew: string;
  emailNew: string;
  usernameNew: string;
  statusNew: string;
  newUser = {};

  allUsers = []; // Array for all users in system
  userNameObj = {}; // Object for deleting/update purposes

  existingUserError: boolean; // Flag if user already existed
  userCreated: boolean; // Flag if user was created successfully

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data; // Get data of all users in storage
        this.statusNew = 'Regular'; // Update back to default status
        console.log(this.allUsers);
    });
  }

  createUser() {
    // Object for storing new user info
    this.newUser = {
      username: this.usernameNew,
      email: this.emailNew,
      pwd: this.pwdNew,
      status: this.statusNew,
      groups: [ { groupName: '', channels: [] } ]
    };

    // Post the new user object to the addUser API
    this.httpClient.post(BACKEND_URL + '/addUser', this.newUser)
      .subscribe((data: any) => {
        console.log('success');

        // If user already existed
        if (data) {
          // Update flags
          this.existingUserError = true;
          this.userCreated = false;
        } else {
          // Update flags
          this.userCreated = true;
          this.existingUserError = false;
          // Reset the 'new' user info
          this.pwdNew = '';
          this.emailNew = '';
          this.usernameNew = '';
          this.statusNew = '';
          // Refresh displayed user records
          this.getAllUsers();
        }
    });
  }

  deleteUser(userID) {
    this.userNameObj = {userID};
    this.httpClient.post(BACKEND_URL + '/deleteUser', this.userNameObj)
      .subscribe((data: any) => {
      console.log('success');
      this.getAllUsers(); // Update list of users
    });
  }

  isSuperAdmin() {
    // Check session storage of current user's 'status'
    if (sessionStorage.getItem('statusUser') === 'SuperAdmin') {
      return true;
    } else {
      return false;
      }
  }

  updateStatus(userID, newStatus) {
    // Store username and new status in an object to send
    this.userNameObj = {userID, newStatus};
    this.httpClient.post(BACKEND_URL + '/updateStatus', this.userNameObj)
      .subscribe((data: any) => {
        console.log('success');
        this.getAllUsers(); // Update list of users
      });
    }
}
