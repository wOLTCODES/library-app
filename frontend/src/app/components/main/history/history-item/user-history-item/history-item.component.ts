import { Component, Input, OnInit } from '@angular/core';
import { BorrowHistory } from '../../../../../model/BorrowHistory';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  @Input() public borrow: BorrowHistory;
  constructor() {}

  ngOnInit(): void {}
}
