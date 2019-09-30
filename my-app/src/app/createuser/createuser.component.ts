import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  selectedFile = null; // File we have selected
  imagePath = '';

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllUsers();
  }

  // Getting all users in the system
  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data; // Get data of all users in storage
        this.statusNew = 'Regular'; // Update back to default status
        console.log(this.allUsers);
    });
  }

  // Creating new user
  createUser() {
    // Object for storing new user info
    this.newUser = {
      username: this.usernameNew,
      email: this.emailNew,
      pwd: this.pwdNew,
      status: this.statusNew,
      groups: [ ]
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

  // Deleting user
  deleteUser(username) {
    this.userNameObj = {username};
    this.httpClient.post(BACKEND_URL + '/deleteUser', this.userNameObj)
      .subscribe((data: any) => {
      console.log('success');
      this.getAllUsers(); // Update list of users
    });
  }

  // Checking if user is superadmin
  isSuperAdmin() {
    // Check session storage of current user's 'status'
    if (sessionStorage.getItem('statusUser') === 'SuperAdmin') {
      return true;
    } else {
      return false;
      }
  }

    // Checking if user is GroupAdmin
    isGroupAdmin() {
      // Check session storage of current user's 'status'
      if (sessionStorage.getItem('statusUser') === 'GroupAdmin') {
        return true;
      } else {
        return false;
      }
    }

  // Checking if user is GroupAssis
  isGroupAssis() {
    // Check session storage of current user's 'status'
    if (sessionStorage.getItem('statusUser') === 'GroupAssis') {
      return true;
    } else {
      return false;
    }
  }

  // Updating status of user
  updateStatus(userID, newStatus) {
    // Store username and new status in an object to send
    this.userNameObj = {username: userID, status: newStatus};
    this.httpClient.post(BACKEND_URL + '/updateStatus', this.userNameObj)
      .subscribe((data: any) => {
        console.log('success');
        this.getAllUsers(); // Update list of users
      });
    }

  // Selecting a file
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  // Image upload
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.httpClient.post(BACKEND_URL + '/imageUpload', fd)
      .subscribe((data: any) => {
        this.imagePath = data.filename;
        console.log(data.filename + ' ' + data.size);
      });
  }
}
