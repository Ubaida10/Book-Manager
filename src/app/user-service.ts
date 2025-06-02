import { Injectable } from '@angular/core';
import {Users} from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url= 'http://localhost:3000/users';

  constructor() { }

  async getAllUsers(): Promise<Users[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async verifyUser(email: string, password: string): Promise<boolean>{
    const users = await this.getAllUsers();
    return users.some((user)=>{
      return user.email === email && user.password === password;
    })
  }
}
