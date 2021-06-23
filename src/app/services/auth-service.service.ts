import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  response: any
  userAuth(user: string, pass: string) {
    fetch('127.0.0:900/auth/json?user=' + user + '&pass=' + pass).then((response) => { this.response = response })
    return (this.response[0])
  }
}
