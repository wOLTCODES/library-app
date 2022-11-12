import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BorrowCurrently} from "../../../model/BorrowCurrently";

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {

  public borrows: BorrowCurrently[]

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    //fetch all books
    this._http
      .get<BorrowCurrently[]>('/knihovna/api/borrow/my', {observe: 'response'})
      .subscribe({
        next: (response) => {
          let borrows = response.body
          if (borrows == null) throw new Error('No body')
          this.borrows = borrows
        },
        error: (error: any) => {

        },
      });
  }

}
