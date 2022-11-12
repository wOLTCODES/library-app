import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BorrowHistory} from "../../../model/BorrowHistory";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {
  public borrows: BorrowHistory[]
  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    //fetch all books
    this._http
      .get<BorrowHistory[]>('/knihovna/api/borrow/history/all', {observe: 'response'})
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
