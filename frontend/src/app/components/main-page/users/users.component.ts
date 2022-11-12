import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../model/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[]

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    //fetch all books
    this._http
      .get<User[]>('/knihovna/api/user', {observe: 'response'})
      .subscribe({
        next: (response) => {
          let users = response.body
          if (users == null) throw new Error('No body')
          this.users = users
        },
        error: (error: any) => {

        },
      });
  }
}
