import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../model/Book';
import { BorrowCurrently } from '../model/BorrowCurrently';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public isLoaded = new BehaviorSubject<boolean>(false);
  public books: Book[];
  public actualBookId = new BehaviorSubject<string>('');
  public endpointURLSearch = new BehaviorSubject<string>('/knihovna/api/book?');
  public borrows: BorrowCurrently[];

  constructor(private _http: HttpClient) {}

  public fetch(): void {
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

  public fetchSearch(): void {
    this.isLoaded.next(false);
    this._http
      .get<Book[]>(this.endpointURLSearch.value, { observe: 'response' })
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

  public sortByYear(): void {
    this.isLoaded.next(false);
    this._http
      .get<Book[]>(
        `/knihovna/api/book?orderByType=DESC&orderBy=PUBLISHED_YEAR`,
        {
          observe: 'response',
        }
      )
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

  public fetchBorrowedBooks() {
    this.isLoaded.next(false);
    this._http
      .get<BorrowCurrently[]>('/knihovna/api/borrow/my', {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          let borrows = response.body;
          if (borrows == null) throw new Error('No body');
          this.borrows = borrows;
          this.isLoaded.next(true);
        },
        error: (error: any) => {},
      });
  }
}
