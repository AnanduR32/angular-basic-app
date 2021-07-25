import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserGetService {
  userDetails: any;
  constructor(private http: HttpClient) {
  }
  getUserDetails(user_id: string, accessToken: string) {
    const headers = {
      'content-type': 'application/json',
      'access_key': accessToken,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
    const url = 'http://localhost:15680/api/v1/fetchStudentById'
    let data = JSON.stringify({ 'id': user_id[0] });
    // let response = this.http.post(url, data, { 'headers': headers }).toPromise()
    return this.http.post(url, data, { 'headers': headers });
  }
}
