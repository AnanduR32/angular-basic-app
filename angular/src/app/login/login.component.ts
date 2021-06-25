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
  submitted;

  constructor(
    private auth: AuthServiceService,
    private route: Router
  ) {
    this.username = ''
    this.password = ''
    this.submitted = false
    this.showAlertBool = false
  }

  ngOnInit(): void {
  }
  delay(ms:number){
    return new Promise(resolve => setTimeout(resolve,ms))
  }
  
  async loginSubmit() {
    this.submitted = true;
    await this.delay(350);
    const response = await this.auth.userAuth(this.username, this.password) 
    if (response[0] === true) {
      this.route.navigateByUrl('/home', { state: response[1] });
    }
    else {
      this.showAlertBool = true;
    }
    this.submitted = false;
  }
}
