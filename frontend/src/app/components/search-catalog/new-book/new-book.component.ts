import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
  @ViewChild('imageInput') imageInput: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('author') author: ElementRef;
  @ViewChild('pageNumber') pageNumber: ElementRef;
  @ViewChild('publishedYear') publishedYear: ElementRef;
  @ViewChild('copies') copies: ElementRef;

  private _base64string: string;
  private _file: File;
  private _bookData: {};

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

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
    console.log(this._base64string);
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
      .post('https://woltcodes.com/knihovna/api/book/insert', this._bookData, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => console.log(response),
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }
}
