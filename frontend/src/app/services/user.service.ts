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
  public isLoaded$ = new BehaviorSubject<boolean>(false);
  public firstnameSortOrder$ = new BehaviorSubject<string>('');
  public lastnameSortOrder$ = new BehaviorSubject<string>('');
  public addressSortOrder$ = new BehaviorSubject<string>('');
  public birthnumberSortOrder$ = new BehaviorSubject<string>('');
  public endpointURLSearch = new BehaviorSubject<string>('/knihovna/api/user?');

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
    this.isLoaded$.next(false);

    this._http
      .get<User[]>('/knihovna/api/user', { observe: 'response' })
      .subscribe({
        next: (response) => {
          let users = response.body;
          if (users == null) throw new Error('No body');
          this.users = users;
          this.isLoaded$.next(true);
        },
        error: (error: any) => {},
      });
  }

  public fetchSearch(): void {
    this.isLoaded$.next(false);
    console.log(this.endpointURLSearch.value);

    this._http
      .get<User[]>(this.endpointURLSearch.value, { observe: 'response' })
      .subscribe({
        next: (response) => {
          let users = response.body;
          console.log(users);

          if (users == null) {
            throw new Error('No body');
          }
          this.users = users;
          this.isLoaded$.next(true);
        },
        error: (error: any) => {},
      });
  }

  public sortByFirstname(orderType: string): void {
    this.isLoaded$.next(false);
    this.firstnameSortOrder$.next(orderType);
    this._http
      .get<User[]>(
        `/knihovna/api/user?orderByType=${orderType}&orderBy=FIRSTNAME`,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          let users = response.body;
          if (users == null) {
            throw new Error('No body');
          }
          this.users = users;
          this.isLoaded$.next(true);
        },
        error: (error: any) => {},
      });
  }

  public sortByLastname(orderType: string): void {
    this.isLoaded$.next(false);
    this.lastnameSortOrder$.next(orderType);
    this._http
      .get<User[]>(
        `/knihovna/api/user?orderByType=${orderType}&orderBy=LASTNAME`,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          let users = response.body;
          if (users == null) {
            throw new Error('No body');
          }
          this.users = users;
          this.isLoaded$.next(true);
        },
        error: (error: any) => {},
      });
  }

  public sortByAddress(orderType: string): void {
    this.isLoaded$.next(false);
    this.addressSortOrder$.next(orderType);
    this._http
      .get<User[]>(
        `/knihovna/api/user?orderByType=${orderType}&orderBy=ADDRESS`,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          let users = response.body;
          if (users == null) {
            throw new Error('No body');
          }
          this.users = users;
          this.isLoaded$.next(true);
        },
        error: (error: any) => {},
      });
  }

  public sortByBirthnumber(orderType: string): void {
    this.isLoaded$.next(false);
    this.birthnumberSortOrder$.next(orderType);
    this._http
      .get<User[]>(
        `/knihovna/api/user?orderByType=${orderType}&orderBy=BIRTH_NUMBER`,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          let users = response.body;
          if (users == null) {
            throw new Error('No body');
          }
          this.users = users;
          this.isLoaded$.next(true);
        },
        error: (error: any) => {},
      });
  }
}
