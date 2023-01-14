import { Component, OnInit } from '@angular/core';
import { BorrowCurrently } from '../../../model/BorrowCurrently';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss'],
})
export class UserBooksComponent implements OnInit {
  public borrows: BorrowCurrently[];

  constructor(public bookS: BookService, public userS: UserService) {}

  ngOnInit(): void {
    this.bookS.fetchBorrowedBooks();
  }
}
