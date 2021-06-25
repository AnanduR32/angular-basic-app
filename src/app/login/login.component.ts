import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password;
  showAlertBool;

  constructor(
    private auth: AuthServiceService,
    private route: Router
  ) {
    this.username = ''
    this.password = ''
    this.showAlertBool = false
  }

  ngOnInit(): void {
  }

  async loginSubmit() {
    if (await this.auth.userAuth(this.username, this.password) === 'True') {
      this.route.navigateByUrl('/home', { state: this.username });
    }
    else {
      this.showAlertBool = true;
    }
  }
}
