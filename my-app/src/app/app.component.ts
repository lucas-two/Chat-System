import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-app';

  getidUser() {
    return sessionStorage.getItem('usernameUser');
  }

  // Checking if user is superAdmin
  isSuperAdmin() {
    if (sessionStorage.getItem('statusUser') === 'SuperAdmin') {
      return true;
    } else {
      return false;
      }
  }

  LoginStatus() {
    if (sessionStorage.getItem('usernameUser') == null) {
      return false;
    } else {
      return true;
    }
  }

  LogOut() {
    sessionStorage.clear();
  }
}
