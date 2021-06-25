import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {
  userDetails: any;
  constructor() {
  }
  async getUserDetails(username: string) {
    await fetch('http://192.168.1.4:8080/userdetails?username=' + username).then((response) =>
    { this.userDetails = response.text() })
    return this.userDetails;
  }
}
