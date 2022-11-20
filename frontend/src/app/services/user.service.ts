import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User;
  public users: User[];
  public isLoaded = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this.updateUser();
  }

  public updateUser() {
    this._http
      .get<User>('/knihovna/api/user/current-user', { observe: 'response' })
      .subscribe({
        next: (response) => {
          let user = response.body;
          if (user == null) {
            throw new Error('No body');
          }
          this._user = user;
        },
        error: (error: any) => {},
      });
  }

  public getUser(): User {
    return this._user;
  }

  public fetch() {
    //fetch all users
    this.isLoaded.next(false);

    this._http
      .get<User[]>('/knihovna/api/user', { observe: 'response' })
      .subscribe({
        next: (response) => {
          let users = response.body;
          if (users == null) throw new Error('No body');
          this.users = users;
          this.isLoaded.next(true);
        },
        error: (error: any) => {},
      });
  }
}
