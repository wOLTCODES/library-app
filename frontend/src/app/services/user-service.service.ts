import { Injectable } from '@angular/core';
import {User} from "../model/User";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _user: User

  constructor(private _http: HttpClient) {
    this.updateUser()
  }

  public updateUser() {
    this._http
      .get<User>('/knihovna/api/user/current-user', {observe: 'response'})
      .subscribe({
        next: (response) => {
          let user = response.body
          if (user == null) {
            throw new Error('No body')
          }
          this._user = user
        },
        error: (error: any) => {

        },
      });
  }

  public getUser(): User {
    return this._user
  }
}
