import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private _registerData: {};

  @ViewChild('username') username: string;
  @ViewChild('password') password: string;
  @ViewChild('repeatedPassword') repeatedPassword: string;
  @ViewChild('firstname') firstname: string;
  @ViewChild('lastname') lastname: string;
  @ViewChild('birthNumber') birthNumber: number;
  @ViewChild('address') address: string;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  public submitRegister(): void {
    this._registerData = {
      username: this.username,
      password: this.password,
      repeatedPassword: this.repeatedPassword,
      firstname: this.firstname,
      lastname: this.lastname,
      birthNumber: this.birthNumber,
      address: this.address,
    };

    this._http
      .post('https://woltcodes.com/api/user/register', this._registerData)
      .subscribe({
        next: (response) => console.log(response),
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }
}
