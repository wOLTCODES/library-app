import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BorrowHistory } from '../../../model/BorrowHistory';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss'],
})
export class UserHistoryComponent implements OnInit {
  public borrows: BorrowHistory[];
  constructor(private _http: HttpClient, private _userS: UserServiceService) {}

  ngOnInit(): void {
    this.fetch();
  }

  public fetchHistory() {
    this._http
      .get<BorrowHistory[]>(
        this._userS.getUser().isAdmin
          ? '/knihovna/api/borrow/history/all'
          : `/knihovna/api/borrow/history/${this._userS.getUser().id}`,
        { observe: 'response' }
      )
      .subscribe({
        next: (response) => {
          let borrows = response.body;
          if (borrows == null) throw new Error('No body');
          this.borrows = borrows;
        },
        error: (error: any) => {},
      });
  }

  fetch() {
    //fetch history
    if (!this._userS.getUser()) {
      setTimeout(() => {
        this.fetchHistory();
      }, 1000);
    } else {
      this.fetchHistory();
    }
  }
}
