import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
