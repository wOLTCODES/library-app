import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fetch() {
    //fetch all books
    this._http
      .get('/knihovna/api/borrow/history/all', {observe: 'response'})
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
