import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() title = '';

  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  constructor(public bookS: BookService) {}

  ngOnInit(): void {
    this.bookS.fetch();
  }
}
