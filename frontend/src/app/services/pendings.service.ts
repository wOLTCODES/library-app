import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class PendingsService {
  public isLoaded = new BehaviorSubject<boolean>(false);
  public users: User[];

  constructor(private _http: HttpClient) {}

  public fetch(): void {
    this.isLoaded.next(false);
    this._http
      .get<User[]>('/knihovna/api/user/pending', { observe: 'response' })
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
