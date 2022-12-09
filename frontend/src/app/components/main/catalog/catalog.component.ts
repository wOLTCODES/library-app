import { Component, Input, OnInit } from '@angular/core';
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

  constructor(public bookS: BookService) {}

  ngOnInit(): void {
    this.bookS.fetch();
  }
}
