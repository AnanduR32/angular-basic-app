import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetService } from '../services/user-get.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user_id: any;
  userDetails: any = {};
  constructor(
    private userDetailService: UserGetService,
    private route: Router,
    private _location: Location
  ) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state
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
    }
  }

}
