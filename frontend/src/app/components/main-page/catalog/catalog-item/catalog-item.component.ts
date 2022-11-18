import { Component, Input, OnInit } from '@angular/core';
import {
  faArrowRightFromBracket,
  faBackward,
  faBookBookmark,
  faBookmark,
  faPencil,
  faStepBackward,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../../model/Book';
import { UserServiceService } from 'src/app/services/user-service.service';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
  @Input() book: Book;

  faBorrow = faBookBookmark;
  faTrash = faTrash;
  faPencil = faPencil;

  constructor(
    private _http: HttpClient,
    public userS: UserServiceService,
    private _bookS: BookService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  borrow(bookId: string) {
    this._http
      .post(`/knihovna/api/book/borrow/${bookId}`, { observe: 'response' })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: any) => {},
      });
  }

  edit(bookId: string) {
    this._bookS.actualBookId.next(bookId);
    this._router.navigate(['/', 'edit-book']);
  }

  delete(bookId: string) {
    this._http
      .delete(`/knihovna/api/book/delete/${bookId}`, { observe: 'response' })
      .subscribe({
        next: () => {
          this._bookS.fetch();
        },
        error: (error: any) => {},
      });
  }
}
