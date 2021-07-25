import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenParams } from '../models/tokenParams';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {
    this.sessions = ''
  }
  sessions: string | null;

  setActive() {
    this.sessions = this.getActivity()
    if (this.sessions !== null)
      localStorage.setItem('ActiveSessions', `${Number(this.sessions) + 1}`)
    else {
      localStorage.setItem('ActiveSessions', '1')
    }
  }
  setInactive(): boolean {
    this.sessions = this.getActivity()
    if (this.sessions !== null)
      if (this.sessions !== '1') {
        localStorage.setItem('ActiveSessions', `${Number(this.sessions) - 1}`)
        return (false)
      } else {
        localStorage.removeItem('ActiveSessions')
        return (true)
      }
    else {
      return (false)
    }
  }
  getActivity() {
    return (localStorage.getItem('ActiveSessions') || null)
  }


  userAuth(username: string, password: string): Observable<TokenParams> {
    const url = 'http://127.0.0.1:15681/authenticate';
    const headers = { 'content-type': 'application/json' }
    let data = JSON.stringify({ 'user': username, 'pswd': password });
    return this.http.post(url, data, { 'headers': headers });
  }

  setAccessToken(token: string) {
    localStorage.setItem('token', token)
  }
  getAccessToken(): string | null {
    return (localStorage.getItem('token') || null);
  }

  signOut() {
    this.cleanup()
  }

  cleanup() {
    localStorage.clear()
  }

}