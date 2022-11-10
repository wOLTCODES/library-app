import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() title = '';

  public assets = [
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
    {
      title: 'Title',
      name: 'Kniha',
      author: 'Karel',
      numberOfPages: 5,
      yearOfPublication: 2031,
      actions: '',
    },
  ];

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.fetch()
  }

  fetch() {
    //fetch all books
    this._http
      .get('/knihovna/api/book', {observe: 'response'})
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: any) => {
          if (error.status === 401) {

          }
        },
      });
  }

  borrow() {
    //borrow a book
    this._http
      .get('/knihovna/api/book/borrow/<book_id>', {observe: 'response'})
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: any) => {
          if (error.status === 401) {

          }
        },
      });
  }
}
