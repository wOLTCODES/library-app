import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/User';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss'],
})
export class PendingsComponent implements OnInit {
  public users: User[];
  public isLoaded = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.isLoaded.next(false);
    //fetch all books
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
