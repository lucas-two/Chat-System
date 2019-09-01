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
  groupsUser = JSON.parse(sessionStorage.getItem('groupsUser'));
  statusUser = sessionStorage.getItem('statusUser');

  allUsers = [];
  selectedGroup: string;
  selectedChannel: string;

  newGroupName: string;
  newChannelName: string;
  newGroup = { groupName: this.newGroupName, channels: [] };

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.httpClient.get(BACKEND_URL + '/getUsers')
      .subscribe((data: any) => {
        this.allUsers = data;
    });
  }

  hasSlectedGroup() {
    if (this.selectedGroup == null) {
      return false;
    } else {
      return true;
    }
  }

  addUserToGroup() {
    this.httpClient.get(BACKEND_URL + '/addToGroup')
      .subscribe((data: any) => {
    });
  }


}
