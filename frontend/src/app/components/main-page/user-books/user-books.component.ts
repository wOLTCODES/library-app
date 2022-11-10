import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fetch() {
    //fetch all books
    this._http
      .get('/knihovna/api/borrow/my', {observe: 'response'})
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
