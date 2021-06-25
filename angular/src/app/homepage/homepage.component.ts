import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetService } from '../services/user-get.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user:any;
  userDetails:any;
  constructor(
    private userDetailService: UserGetService,
    private route: Router
  ) { 
    this.user = this.route.getCurrentNavigation()?.extras.state
  }

  ngOnInit(): void {
    this.userDetails = this.userDetailService.getUserDetails(this.user)
    console.log(this.userDetails)
  }

}
