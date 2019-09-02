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

  userGroupObject = {}; // Object for storing group info (add/remove)
  groupObject = { groupName: '', channels: [] }; // Storing group object
  simpleGroupObject = {}; // Where we do not need to send entire group objecft
  channelObject = {}; // Storing channel object

  // Storing management related group/channel names
  selectedGroupManageG: string;
  selectedUserManageG: string;
  selectedGroupManageC: string;
  selectedChannelManageC: string;
  selectedUserManageC: string;

  // Variables for creating new groups & channels
  inputGroupName: string;
  groupOfInputChannel: string;
  inputChannelName: string;

  userText: string; // Stores what user writes in textbox

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
    this.selectedGroupManageG = '';
    this.selectedUserManageG = '';
    this.selectedGroupManageC = '';
    this.selectedChannelManageC = '';
    this.selectedUserManageC = '';
    this.selectedGroup = '';
    this.selectedChannel = '';
    this.inputGroupName = '';
    this.groupOfInputChannel = '';
    this.inputChannelName = '';
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
    if (this.selectedGroup === '') {
      return false;
    } else {
      return true;
    }
  }

    // Has user selected a channel
    hasSlectedChannel() {
      if (this.selectedChannel === '') {
        return false;
      } else {
        return true;
      }
    }

  // Adding a user to a group
  addUserToGroup(userID, groupID) {
    this.groupObject = {groupName: groupID, channels: []};
    this.userGroupObject = {user: userID, group: this.groupObject};
    this.httpClient.post(BACKEND_URL + '/addToGroup', this.userGroupObject)
      .subscribe((data: any) => {
        console.log('Success');
    });
  }

  // Adding a user to a channel
  addUserToChannel(userID, groupID, channelID) {
    this.userGroupObject = {user: userID, group: groupID, channel: channelID};
    this.httpClient.post(BACKEND_URL + '/addToChannel', this.userGroupObject)
      .subscribe((data: any) => {
        console.log('Success');
    });
  }

  // Removing a user from a group
  removeUserFromGroup(userID, groupID) {
    this.userGroupObject = {user: userID, group: groupID};
    this.httpClient.post(BACKEND_URL + '/removeFromGroup', this.userGroupObject)
      .subscribe((data: any) => {
        console.log('Success');
    });
  }

  // Removing a user from a channel
  removeUserFromChannel(userID, groupID, channelID) {
    this.userGroupObject = {user: userID, group: groupID, channel: channelID};
    this.httpClient.post(BACKEND_URL + '/removeFromChannel', this.userGroupObject)
      .subscribe((data: any) => {
        console.log('Success');
    });
  }

  // Creating group
  createGroup(groupID) {
    this.groupObject = {groupName: groupID, channels: []};
    this.httpClient.post(BACKEND_URL + '/createGroup', this.groupObject)
      .subscribe((data: any) => {
        console.log('Success');
        this.inputGroupName = '';
        this.getAllGroups();
    });
  }

  // Creating group
  createChannel(groupID, channelID) {
    this.channelObject = {group: groupID, channel: channelID};
    this.httpClient.post(BACKEND_URL + '/createChannel', this.channelObject)
      .subscribe((data: any) => {
        console.log('Success');
        this.inputChannelName = '';
        this.getAllGroups();
      });
  }

  // deleting group
  deleteGroup(groupID) {
    this.simpleGroupObject = {group: groupID};
    this.httpClient.post(BACKEND_URL + '/deleteGroup', this.simpleGroupObject)
      .subscribe((data: any) => {
        console.log('Success');
        this.inputGroupName = '';
        this.getAllGroups();
      });
  }

  // deleting channel
  deleteChannel(groupID, channelID) {
    this.simpleGroupObject = {group: groupID, channel: channelID};
    this.httpClient.post(BACKEND_URL + '/deleteChannel', this.simpleGroupObject)
      .subscribe((data: any) => {
        console.log('Success');
        this.inputChannelName = '';
        this.getAllGroups();
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
    this.selectedChannel = ''; // Deselect channel
  }

  displayMessage(msg) {
    alert(msg);
  }
}
