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

    this._http
      .post('https://woltcodes.com/knihovna/api/user/login', this.formData)
      .subscribe({
        next: (response) => {
          // route to catalog
          // user is logged
        },
        error: (error: any) => {
          if (error.status === 401) {
            console.log(error.error.message);
          }
        },
      });
  }
}
