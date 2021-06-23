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

  user;
  pass;
  showAlertBool;
  constructor(
    private auth:AuthServiceService,
    private route: Router
  ) {
    this.user = ''
    this.pass = ''
    this.showAlertBool = false
   }

  ngOnInit(): void {
  }

  loginSubmit(){
    if(this.auth.userAuth(this.user,this.pass)==='True'){
      this.route.navigateByUrl('/homepage');
    }
    else{
      this.showAlertBool = true;
    }
  }

}
