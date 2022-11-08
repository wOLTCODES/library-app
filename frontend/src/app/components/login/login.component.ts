import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formData = new FormData();

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  public submitLogin(): void {
    console.log(this.username.nativeElement.value);

    this.formData.append('username', this.username.nativeElement.value);
    this.formData.append('password', this.password.nativeElement.value);

    console.log(this.formData);

    const httpOptions: { headers: any; observe: any } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      observe: 'response',
    };

    this._http
      .post(
        'https://woltcodes.com/knihovna/api/user/login',
        this.formData,
        { observe: 'response' }
        // httpOptions
      )
      .subscribe({
        next: (response) => console.log(response),
        // error: (error: any) => {
        //   console.log(error);

        //   if (error.status === 401) {
        //     console.log(error.headers.get('location'));
        //   }
        // },
      });
  }
}
