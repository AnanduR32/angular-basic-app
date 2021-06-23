import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {
  userDetails: any;
  constructor() {
  }
  async getUserDetails(user: string) {
    await fetch('127.0.0:900/getStudentDetails/json?user=' + user).then((response) => { this.userDetails = response })
    return this.userDetails;
  }
}
