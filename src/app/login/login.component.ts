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

  user: any;
  pass;
  showAlertBool;

  constructor(
    private auth: AuthServiceService,
    private route: Router
  ) {
    this.user = ''
    this.pass = ''
    this.showAlertBool = false
  }

  ngOnInit(): void {
  }

  async loginSubmit() {
    if (await this.auth.userAuth(this.user, this.pass) === 'True') {
      this.route.navigateByUrl('/home', { state: this.user });
    }
    else {
      this.showAlertBool = true;
    }
  }
}
