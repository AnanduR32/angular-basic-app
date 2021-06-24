import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  response: any
  userAuth(user: string, pass: string) {
    console.log(this.response)
    //  fetch('192.168.1.4:8080/auth/json?user=' + user + '&pass=' + pass).then((response) => { this.response = response })
    fetch('192.168.1.4:8080/get/').then((response) => { this.response = response })
    console.log(this.response)
    return (this.response)
  }
}
