import {Component, Input, OnInit} from '@angular/core';
import {BorrowHistory} from "../../../../../model/BorrowHistory";

@Component({
  selector: 'app-user-history-item',
  templateUrl: './user-history-item.component.html',
  styleUrls: ['./user-history-item.component.scss']
})
export class UserHistoryItemComponent implements OnInit {
  @Input() public borrow: BorrowHistory
  constructor() { }

  ngOnInit(): void {
    console.log({bookName: this.borrow.bookName, bookId: this.borrow.bookId})
  }

}
