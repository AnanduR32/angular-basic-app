import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  response: any
  async userAuth(username: string, password: string) {
    username = username.split(' ').join('%20')
    const url = 'http://localhost:5000/api/v1/auth?name=' + username + '&pswd=' + password
    this.response = await fetch(url).then((response) => {return response.json()})
    return (this.response)
  }
}