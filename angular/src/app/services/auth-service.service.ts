import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(){}

  response: any
  async userAuth(username: string, password: string) {

     fetch('http://192.168.1.4:8080/auth?username=' + username + '&password=' + password).then((response) =>
      { this.response = response.text() })
     return (this.response)
   }
 }