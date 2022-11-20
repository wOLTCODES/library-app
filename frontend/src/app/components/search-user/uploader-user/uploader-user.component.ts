import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-uploader-user',
  templateUrl: './uploader-user.component.html',
  styleUrls: ['./uploader-user.component.scss'],
})
export class UploaderUserComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('repeatedPassword') repeatedPassword: ElementRef;
  @ViewChild('firstName') firstname: ElementRef;
  @ViewChild('lastName') lastname: ElementRef;
  @ViewChild('birthNumber') birthNumber: ElementRef;
  @ViewChild('address') address: ElementRef;

  private _userData: {};

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _messageS: MessageService
  ) {}

  ngOnInit(): void {}

  public submitUser() {
    this._userData = {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value,
      repeatedPassword: this.repeatedPassword.nativeElement.value,
      firstname: this.firstname.nativeElement.value,
      lastname: this.lastname.nativeElement.value,
      birthNumber: +this.birthNumber.nativeElement.value,
      address: this.address.nativeElement.value,
    };
    console.log(this._userData);

    this._http
      .post('/knihovna/api/user/register', this._userData, {
        observe: 'response',
      })
      .subscribe({
        next: () => {
          this._router.navigate(['/', 'users']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this._messageS.generateMessage(
              'Please fill all fields',
              'error-message'
            );
          }
        },
      });
  }
}
