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
  displayToken: string;
  constructor(
    private userDetailService: UserGetService,
    private route: Router,
    private _location: Location,
    private auth: AuthServiceService
  ) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state
    this.displayToken = '';
  }

  async fetchDetails() {
    this.userDetails = await this.userDetailService.getUserDetails(this.user_id).then((res) => {
      return res;
    })
  }
  ngOnInit(): void {
    if (this.user_id === undefined) {
      this._location.back()
    }
    else {
      this.fetchDetails()
      this.displayToken = this.auth.getAccessToken()!;
    }
  }

}
