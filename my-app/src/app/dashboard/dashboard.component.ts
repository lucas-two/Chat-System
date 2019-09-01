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

  userText: string; // Stores what user writes in textbox

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

  // Has user selected a group
  hasSlectedGroup() {
    if (this.selectedGroup == null) {
      return false;
    } else {
      return true;
    }
  }

    // Has user selected a channel
    hasSlectedChannel() {
      if (this.selectedChannel == null) {
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

  // - Not yet implemented -
  // Function for sending messages
  sendMessage() {
    this.userText = ''; // Clear textbox
  }

  exitChannel() {
    this.selectedChannel = null;
  }
}
