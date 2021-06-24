import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {
  userDetails: any;
  constructor() {
  }
  async getUserDetails(user: string) {
    await fetch('192.168.1.4:8080/userdetails/json?user=' + user).then((response) => { this.userDetails = response })
    return this.userDetails;
  }
}
