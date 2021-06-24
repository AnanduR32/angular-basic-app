import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  response: any
  userAuth(user: string, pass: string) {
    fetch('192.168.1.4:8080/auth/json?user=' + user + '&pass=' + pass).then((response) => { this.response = response })
    return (this.response[0])
  }
}
