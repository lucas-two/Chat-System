import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'my-app';

  // Get the username of user
  getidUser() {
    return sessionStorage.getItem('usernameUser');
  }

  // Checking if user is SuperAdmin
  isSuperAdmin() {
    if (sessionStorage.getItem('statusUser') === 'SuperAdmin') {
      return true;
    } else {
      return false;
      }
  }

  // Checking if user is GroupAdmin
  isGroupAdmin() {
    if (sessionStorage.getItem('statusUser') === 'GroupAdmin') {
      return true;
    } else {
      return false;
      }
  }

  // Checking if user is logged in
  LoginStatus() {
    if (sessionStorage.getItem('usernameUser') == null) {
      return false;
    } else {
      return true;
    }
  }

  // Clear session if logout
  LogOut() {
    sessionStorage.clear();
  }
}
