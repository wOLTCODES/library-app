import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formData = new FormData();

  @ViewChild('username') username: string;
  @ViewChild('password') password: string;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  public submitLogin(): void {
    const formData: FormData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this._http
      .post('https://woltcodes.com/api/user/login', formData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }
}
