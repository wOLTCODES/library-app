import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-catalog',
  templateUrl: './search-catalog.component.html',
  styleUrls: ['./search-catalog.component.scss'],
})
export class SearchCatalogComponent implements OnInit {
  @ViewChild('bookName') bookName: ElementRef<HTMLInputElement>;
  @ViewChild('authorName') authorName: ElementRef<HTMLInputElement>;
  @ViewChild('publishedYear') publishedYear: ElementRef<HTMLInputElement>;

  public url: string;

  public toggleValue$ = new BehaviorSubject<boolean>(false);

  constructor(public bookS: BookService, public userS: UserService) {}

  ngOnInit(): void {}

  public getParameters(): void {
    this.url = '/knihovna/api/book?';
    const bookName = this.bookName.nativeElement.value;

    if (bookName) {
      if (this.url.length === 19) {
        this.url += 'bookName=' + encodeURIComponent(bookName);
      } else {
        this.url += '&' + 'bookName=' + encodeURIComponent(bookName);
      }
    }
    const authorName = this.authorName.nativeElement.value;
    if (authorName) {
      if (this.url.length === 19) {
        this.url += 'authorName=' + encodeURIComponent(authorName);
      } else {
        this.url += '&' + 'authorName=' + encodeURIComponent(authorName);
      }
    }
    const publishedYear = this.publishedYear.nativeElement.value;
    if (publishedYear) {
      if (this.url.length === 19) {
        this.url += 'publishedYear=' + +publishedYear;
      } else {
        this.url += '&' + 'publishedYear=' + +publishedYear;
      }
    }

    if (this.toggleValue$.value) {
      if (this.url.length === 19) {
        this.url += 'filterType=' + 'OR';
      } else {
        this.url += '&' + 'filterType=' + 'OR';
      }
    } else {
      if (this.url.length === 19) {
        this.url += 'filterType=' + 'AND';
      } else {
        this.url += '&' + 'filterType=' + 'AND';
      }
    }

    this.bookS.endpointURLSearch.next(this.url);

    console.log('actual URL');
    console.log(this.bookS.endpointURLSearch.value);

    this.bookS.fetchSearch();
  }

  public toggleStatus(event: any) {
    if (event.target.checked) {
      this.toggleValue$.next(true);
    } else {
      this.toggleValue$.next(false);
    }
  }
}
