import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../../../model/Book";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() title = '';

  public books: Book[]

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    //fetch all books
    this._http
      .get<Book[]>('/knihovna/api/book', {observe: 'response'})
      .subscribe({
        next: (response) => {
          let books = response.body
          if (books == null) {
            throw new Error('No body')
          }
          this.books = books
        },
        error: (error: any) => {

        },
      });
  }
}
