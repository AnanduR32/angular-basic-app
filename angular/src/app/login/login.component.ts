import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenParams } from '../shared/models/tokenParams';

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
  tokenParam:TokenParams;

  constructor(
    private auth: AuthServiceService,
    private route: Router
  ) {
    this.username = ''
    this.password = ''
    this.submitted = false
    this.showAlertBool = false
    this.tokenParam = {code:'',content:{role:[],token:'',username:''},message:'',status:0}
  }

  ngOnInit(): void {
  }
  
  loginSubmit() {
    this.submitted = true;
    this.auth.userAuth(this.username, this.password).subscribe(data=>{
      this.tokenParam = data;
      this.auth.accessToken = this.tokenParam.content?.token;
      if (this.tokenParam['status'] === 1) {
        this.route.navigateByUrl('/home', { state: [this.tokenParam['content']!['username']] });
      }
      else {
        this.showAlertBool = true;
      }
    }); 
    
    this.submitted = false;
  }
}
