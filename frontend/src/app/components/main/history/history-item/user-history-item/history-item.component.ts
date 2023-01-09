import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BorrowHistory } from '../../../../../model/BorrowHistory';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  @Input() public borrow: BorrowHistory;
  constructor(public userS: UserService) {}

  ngOnInit(): void {}
}
