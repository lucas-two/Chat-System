import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userEmail: string;
  userPwd: string;
  userInvalid: boolean;
  user = {};

  constructor(private router: Router, private httpClient: HttpClient) {}
  ngOnInit() {}

  public LoginUser() {
    this.user = { userEmail: this.userEmail, userPwd: this.userPwd};
    this.httpClient.post(BACKEND_URL + '/login', this.user)
      .subscribe((data: any) => {

        // Login Success
        if (data.valid) {
          sessionStorage.setItem('idUser', data.id);
          sessionStorage.setItem('emailUser', data.email);
          sessionStorage.setItem('usernameUser', data.username);
          sessionStorage.setItem('statusUser', data.status);
          this.router.navigateByUrl('/dashboard');

        // Login Failure
        } else {
          this.userInvalid = true;
        }
      });
    }
}
