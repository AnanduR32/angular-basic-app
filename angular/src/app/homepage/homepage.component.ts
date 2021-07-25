import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetService } from '../shared/services/user-get.service';
import { Location } from '@angular/common';
import { AuthServiceService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user_id: any;
  userDetails: any = {};
  accessToken: string;
  constructor(
    private userDetailService: UserGetService,
    private route: Router,
    private _location: Location,
    private auth: AuthServiceService
  ) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state
    this.accessToken = '';
  }

  async fetchDetails() {
    this.userDetails = this.userDetailService.getUserDetails(this.user_id, this.accessToken).subscribe(data=>{
      this.userDetails = data
    })
  }
  ngOnInit(): void {
    this.accessToken = this.auth.getAccessToken()!
    if (this.user_id === undefined) {
      this._location.back()
    }
    else if (this.accessToken !== 'null') {
      this.fetchDetails()
    }
  }

}
