import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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

  private _messageIdIterator = 0

  constructor(private _http: HttpClient, private _router: Router, private _renderer: Renderer2, private _element:ElementRef) {}

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
            const errorMessageContainer = this._renderer.createElement('div')
            const id = this._messageIdIterator++;
            this._renderer.setAttribute(errorMessageContainer, 'id', id.toString())
            this._renderer.addClass(errorMessageContainer, 'error-message')
            this._renderer.setProperty(errorMessageContainer, 'innerHTML', error.error.message)
            this._renderer.appendChild(this._element.nativeElement, errorMessageContainer)
            setTimeout(() => {
              document.getElementById(id.toString())?.classList.add('show')
            }, 100)
            setTimeout(() => {
              document.getElementById(id.toString())?.classList.remove('show')
            }, 2500)
            setTimeout(() => {
              document.getElementById(id.toString())?.remove()
            }, 2700)
          }
        },
      });
  }
}
