import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  private _messageIdIterator = 0;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _userService: UserService,
    private _messageS: MessageService
  ) {}

  ngOnInit(): void {}

  public submitLogin(): void {
    const formData = new FormData();
    formData.append('username', this.username.nativeElement.value);
    formData.append('password', this.password.nativeElement.value);

    this._http
      .post('/knihovna/api/user/login', formData, { observe: 'response' })
      .subscribe({
        next: (response) => {
          this._userService.updateUser();
          this._router.navigate(['catalog']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this._messageS.generateMessage(
              error.error.message,
              'error-message'
            );
          }
        },
      });
  }
}
