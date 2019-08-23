import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-app';

  getidUser() {
    return sessionStorage.getItem('idUser');
  }

  LoginStatus() {
    if (sessionStorage.getItem('idUser') == null) {
      return false;
    } else {
      return true;
    }
  }

  LogOut() {
    sessionStorage.clear();
  }
}
