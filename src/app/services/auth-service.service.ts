import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  response: any
  async userAuth(user: string, pass: string) {
    console.log(this.response)
     fetch('192.168.1.4:8080/auth?user=' + user + '&pass=' + pass).then((response) => { this.response = response.json() })
    console.log(this.response)
    return (this.response)
  }
}
