import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private _registerData: {};

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('repeatedPassword') repeatedPassword: ElementRef;
  @ViewChild('firstname') firstname: ElementRef;
  @ViewChild('lastname') lastname: ElementRef;
  @ViewChild('birthNumber') birthNumber: ElementRef;
  @ViewChild('address') address: ElementRef;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  public submitRegister(): void {
    console.log(this.username.nativeElement.value);

    this._registerData = {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value,
      repeatedPassword: this.repeatedPassword.nativeElement.value,
      firstname: this.firstname.nativeElement.value,
      lastname: this.lastname.nativeElement.value,
      birthNumber: this.birthNumber.nativeElement.value,
      address: this.address.nativeElement.value,
    };
    console.log(this._registerData);

    this._http
      .post('https://woltcodes.com/knihovna/api/user/register', this._registerData, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => console.log(response),
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }
}
