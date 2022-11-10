import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  public errors: string[] = []

  constructor(private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {}

  public submitLogin(): void {
    const formData = new FormData();
    formData.append('username', this.username.nativeElement.value);
    formData.append('password', this.password.nativeElement.value);

    this._http
      .post('/knihovna/api/user/login', formData, {observe: 'response'})
      .subscribe({
        next: (response) => {
          this._router.navigate(['catalog'])
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.errors.push(error.error.message)
          }
        },
      });
  }
}
