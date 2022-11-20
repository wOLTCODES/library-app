import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BorrowHistory } from '../../../model/BorrowHistory';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public borrows: BorrowHistory[];
  public isLoaded = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private _userS: UserService) {}

  ngOnInit(): void {
    this.fetch();
  }

  public fetchHistory() {
    this.isLoaded.next(false);
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
          this.isLoaded.next(true);
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
