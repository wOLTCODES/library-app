import { Component, Input, OnInit } from '@angular/core';
import {faArrowRightFromBracket, faBackward, faBookBookmark, faBookmark, faPencil, faStepBackward, faTrash} from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {Book} from "../../../../model/Book";

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
  @Input() book: Book;

  faBorrow = faBookBookmark
  faTrash = faTrash
  faPencil = faPencil

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  borrow(bookId: string) {
    this._http
      .get(`/knihovna/api/book/borrow/${bookId}`, {observe: 'response'})
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: any) => {

        },
      });
  }

  edit(bookId: string) {

  }

  delete(bookId: string) {
    this._http
      .delete(`/knihovna/api/book/delete/${bookId}`, {observe: 'response'})
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: any) => {

        },
      });
  }
}
