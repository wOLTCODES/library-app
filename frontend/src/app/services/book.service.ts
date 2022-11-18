import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public isLoaded = new BehaviorSubject<boolean>(false);
  public books: Book[];
  public actualBookId = new BehaviorSubject<string>('');

  constructor(private _http: HttpClient) {}

  fetch() {
    //fetch all books

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
}
