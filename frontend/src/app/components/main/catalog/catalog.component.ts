import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../model/Book';
import { BehaviorSubject } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() title = '';

  constructor(public bookS: BookService) {}

  ngOnInit(): void {
    this.bookS.fetch();
  }
}
