import { Component, Input, OnInit } from '@angular/core';
import { BorrowCurrently } from '../../../../../model/BorrowCurrently';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-user-books-item',
  templateUrl: './user-books-item.component.html',
  styleUrls: ['./user-books-item.component.scss'],
})
export class UserBooksItemComponent implements OnInit {
  @Input() borrow: BorrowCurrently;
  @Input() book: Book;
  faReturn = faArrowRightToBracket;

  constructor(
    private _http: HttpClient,
    private _bookS: BookService,
    public userS: UserService
  ) {}

  ngOnInit(): void {}

  returnBook() {
    this._http
      .post(`/knihovna/api/book/return/${this.borrow.bookId}`, {
        observe: 'response',
      })
      .subscribe({
        next: () => {
          this._bookS.fetchBorrowedBooks();
        },
        error: (error: any) => {},
      });
  }
}
