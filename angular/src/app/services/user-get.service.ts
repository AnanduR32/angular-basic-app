import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {
  userDetails: any;
  constructor() {
  }
  async getUserDetails(user_id: string) {
    const url = 'http://localhost:5000/api/v1/fetchStudentById?id=' + user_id
    this.userDetails = await fetch(url).then((response) => { return response.json() })
    return this.userDetails;
  }
}
