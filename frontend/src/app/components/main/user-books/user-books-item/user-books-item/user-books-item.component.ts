import {Component, Input, OnInit} from '@angular/core';
import {BorrowCurrently} from "../../../../../model/BorrowCurrently";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-user-books-item',
  templateUrl: './user-books-item.component.html',
  styleUrls: ['./user-books-item.component.scss']
})
export class UserBooksItemComponent implements OnInit {

  @Input() borrow: BorrowCurrently
  faReturn = faArrowRightToBracket

  constructor() { }

  ngOnInit(): void {
  }

}
