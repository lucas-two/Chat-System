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
  allGroups = []; // Array for all groups in system
  selectedGroup: string; // Current selected group
  selectedChannel: string; // Current selected group

  // Variables for creating new groups
  newGroupName: string;
  newChannelName: string;
  newGroup = { groupName: this.newGroupName, channels: [] };

  // Channel/group requests for inviting and removing users
  groupRequests: string;

  channelGroupRequests: string;
  channelRequests: string;

  userText: string; // Stores what user writes in textbox

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
  }

  // Getting all users in the system
  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data; // Get data of all users in storage
    });
  }

  // Getting all groups in the system
  getAllGroups() {
    this.httpClient.get(BACKEND_URL + '/getGroups')
      .subscribe((data: any) => {
        this.allGroups = data; // Get data of all groups in storage
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
        console.log('Success');
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

  // - Not yet implemented -
  // Function for sending messages
  sendMessage() {
    this.userText = ''; // Clear textbox
  }

  // - Not yet implemented -
  // Function for exiting channel
  exitChannel() {
    this.selectedChannel = null; // Deselect channel
  }
}
