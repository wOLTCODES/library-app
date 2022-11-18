import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-uploader-book',
  templateUrl: './uploader-book.component.html',
  styleUrls: ['./uploader-book.component.scss'],
})
export class UploaderBookComponent implements OnInit {
  @ViewChild('imageInput') imageInput: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('author') author: ElementRef;
  @ViewChild('pageNumber') pageNumber: ElementRef;
  @ViewChild('publishedYear') publishedYear: ElementRef;
  @ViewChild('copies') copies: ElementRef;

  private _base64string: string;
  private _file: File;
  private _bookData: {};

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _messageS: MessageService
  ) {}

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

    console.log(this._bookData);

    this._http
      .post('/knihovna/api/book/insert', this._bookData, {
        observe: 'response',
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this._router.navigate(['/', 'catalog']);
        },
        error: (error: any) => {
          console.log(error.status);
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
