import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Book } from 'src/app/model/Book';
import { BookService } from 'src/app/services/book.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  public books: Book[];
  @ViewChild('imageInput') imageInput: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('author') author: ElementRef;
  @ViewChild('pageNumber') pageNumber: ElementRef;
  @ViewChild('publishedYear') publishedYear: ElementRef;
  @ViewChild('copies') copies: ElementRef;

  private _base64string: string;
  private _file: File;
  private _bookData: {};
  public isLoaded = new BehaviorSubject<boolean>(false);

  public actualBook: any;

  constructor(
    private _bookS: BookService,
    private _http: HttpClient,
    private _router: Router,
    private _messageS: MessageService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  public processImage(event: any) {
    this._file = event.target.files[0];

    if (this._file) {
      const reader = new FileReader();
      reader.onload = this._handleReader.bind(this);
      reader.readAsBinaryString(this._file);
    }
  }

  private _handleReader(event: any) {
    const binaryString = event.target.result;
    this._base64string = `data:${this._file.type};base64,` + btoa(binaryString);
  }

  public fetch() {
    this.isLoaded.next(false);

    this._http
      .get<Book[]>('/knihovna/api/book', { observe: 'response' })
      .subscribe((data) => {
        this.actualBook = data.body?.filter(
          (book) => book.id == this._bookS.actualBookId.value
        );
        this.isLoaded.next(true);
      });
  }

  public submitBook() {
    this._bookData = {
      name: this.name.nativeElement.value,
      author: this.author.nativeElement.value,
      pageNumber: this.pageNumber.nativeElement.value,
      publishedYear: this.publishedYear.nativeElement.value,
      coverImg: this._base64string,
      copies: this.copies.nativeElement.value,
    };

    this._http
      .post(
        `/knihovna/api/book/edit/${this._bookS.actualBookId.value}`,
        this._bookData,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/', 'catalog']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this._messageS.generateMessage(
              'Please fill all inputs',
              'error-message'
            );
          }
        },
      });
  }
}
