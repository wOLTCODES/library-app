import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../model/Book';
import { BehaviorSubject } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() title = '';

  faArrowDown = faArrowDown;
  public books: Book[];

  public isLoaded = new BehaviorSubject<boolean>(false);

  constructor(public bookS: BookService, private _http: HttpClient) {}

  ngOnInit(): void {
    this.bookS.fetch();
  }

  fetch() {
    this.isLoaded.next(false);
    this._http
      .get<Book[]>('/knihovna/api/book', { observe: 'response' })
      .subscribe({
        next: (response) => {
          let books = response.body;
          if (books == null) {
            throw new Error('No body');
          }
          this.books = books;
          this.isLoaded.next(true);
        },
        error: (error: any) => {},
      });
  }

  public sortByName(): void {
    this.isLoaded.next(false);
    this._http
      .get<Book[]>(`/knihovna/api/book?orderByType=DESC&orderBy=NAME`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          let books = response.body;
          if (books == null) {
            throw new Error('No body');
          }
          this.books = books;
          this.isLoaded.next(true);
        },
        error: (error: any) => {},
      });
  }

  public sortByAuthor(): void {
    this.isLoaded.next(false);
    this._http
      .get<Book[]>(`/knihovna/api/book?orderByType=DESC&orderBy=AUTHOR`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          let books = response.body;
          if (books == null) {
            throw new Error('No body');
          }
          this.books = books;
          this.isLoaded.next(true);
        },
        error: (error: any) => {},
      });
  }
}
