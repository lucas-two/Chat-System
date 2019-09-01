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
  // Get user details from session storage
  usernameUser = sessionStorage.getItem('usernameUser');
  groupsUser = JSON.parse(sessionStorage.getItem('groupsUser'));
  statusUser = sessionStorage.getItem('statusUser');

  allUsers = []; // Array for all users in system
  selectedGroup: string; // Current selected group
  selectedChannel: string; // Current selected group

  // Variables for creating new groups
  newGroupName: string;
  newChannelName: string;
  newGroup = { groupName: this.newGroupName, channels: [] };

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
  }

  // Getting all users in the system
  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data; // Get data of all users in storage
    });
  }

  // Knowing if channels should be displayed
  hasSlectedGroup() {
    if (this.selectedGroup == null) {
      return false;
    } else {
      return true;
    }
  }

  // Adding a user to a group
  addUserToGroup() {
    this.httpClient.get(BACKEND_URL + '/addToGroup')
      .subscribe((data: any) => {
    });
  }
}
