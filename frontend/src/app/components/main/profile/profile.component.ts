import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('username') username: ElementRef<HTMLInputElement>;
  @ViewChild('firstname') firstname: ElementRef<HTMLInputElement>;
  @ViewChild('lastname') lastname: ElementRef<HTMLInputElement>;
  @ViewChild('password') password: ElementRef<HTMLInputElement>;
  @ViewChild('repeatedPassword') repeatedPassword: ElementRef<HTMLInputElement>;
  @ViewChild('birthNumber') birthNumber: ElementRef<HTMLInputElement>;
  @ViewChild('address') address: ElementRef<HTMLInputElement>;

  public actualUser: any;
  private _userData: any;
  public isLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private _http: HttpClient,
    public userS: UserService,
    private _router: Router,
    private _messageS: MessageService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  public fetch() {
    this.isLoaded$.next(false);
    this._http
      .get<User[]>('/knihovna/api/user', { observe: 'response' })
      .subscribe((data) => {
        this.actualUser = data.body?.filter(
          (book) => book.id == this.userS.actualUserId.value
        );
        this.isLoaded$.next(true);
      });
  }

  public submitUser() {
    this._userData = {
      username: this.username.nativeElement.value,
      firstname: this.firstname.nativeElement.value,
      lastname: this.lastname.nativeElement.value,
      birthNumber: this.birthNumber.nativeElement.value,
      address: this.address.nativeElement.value,
    };

    if (
      this.password.nativeElement.value ===
      this.repeatedPassword.nativeElement.value
    ) {
      this._userData.password = this.password.nativeElement.value;
      this._userData.repeatedPassword =
        this.repeatedPassword.nativeElement.value;

      this._http
        .post(
          `/knihovna/api/user/edit/${
            this.userS.actualUserId.value || this.userS.getUser().id
          }`,
          this._userData,
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
    } else {
      this._messageS.generateMessage('Passwords do not match', 'error-message');
    }
  }
}
