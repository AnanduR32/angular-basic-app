import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenParams } from '../shared/models/tokenParams';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password;
  showAlertBool;
  submitted;
  tokenParam: TokenParams;

  constructor(
    private auth: AuthServiceService,
    private route: Router
  ) {
    this.username = ''
    this.password = ''
    this.submitted = false
    this.showAlertBool = false
    this.tokenParam = { code: '', content: { role: [], token: '', username: '' }, message: '', status: 0 }
  }

  ngOnInit(): void {
    if (this.auth.getAccessToken() != null) {
      let username = localStorage.getItem('username')
      this.route.navigateByUrl('/home', { state: [username] });
    }
  }

  loginSubmit() {
    this.submitted = true;
    this.auth.userAuth(this.username, this.password).subscribe(
      (data) => {
        this.tokenParam = data;
        this.auth.setAccessToken(this.tokenParam.content?.token!);
        localStorage.setItem('username', this.tokenParam['content']!['username']!)
        this.route.navigateByUrl('/home', { state: [this.tokenParam['content']!['username']] });
      },
      (error: HttpErrorResponse) => {
        alert(`Invalid Login\n${error.message}`)
        this.showAlertBool = true;

      }
    );
    this.submitted = false;
  }
}
