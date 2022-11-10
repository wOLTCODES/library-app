import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  fetch() {
    //fetch all books
    this._http
      .get('/knihovna/api/user', {observe: 'response'})
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: any) => {
          if (error.status === 401) {

          }
        },
      });
  }
}
