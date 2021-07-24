import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenParams } from '../models/tokenParams';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {
  }

  userAuth(username: string, password: string): Observable<TokenParams> {
    const url = 'http://127.0.0.1:15681/authenticate';
    const headers = { 'content-type': 'application/json' }
    let data = JSON.stringify({ 'user': username, 'pswd': password });
    return this.http.post(url, data, { 'headers': headers });
  }

  setAccessToken(token: string) {
    sessionStorage.setItem('token', token)
  }
  getAccessToken():string {
    return(sessionStorage.getItem('token')||'Invalid');
  }
  
}