import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../model/User';
import {
  faDownLong,
  faHammer,
  faUpLong,
  faUserSlash,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss'],
})
export class UsersItemComponent implements OnInit {
  @Input() user: User;
  faUp = faUpLong;
  faDown = faDownLong;
  faBan = faHammer;
  faUnban = faUserSlash;
  faPencil = faPencil;

  constructor(
    private _userS: UserService,
    private _http: HttpClient,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  public promote(): void {
    this._http
      .post<User[]>(`/knihovna/api/user/promote/${this.user.id}`, {
        observe: 'response',
      })
      .subscribe({
        next: () => {
          this._userS.updateUser();
          this._userS.fetch();
        },
        error: (error: any) => {},
      });
  }

  public demote(): void {
    this._http
      .post<User[]>(`/knihovna/api/user/demote/${this.user.id}`, {
        observe: 'response',
      })
      .subscribe({
        next: () => {
          this._userS.updateUser();
          this._userS.fetch();
        },
        error: (error: any) => {},
      });
  }

  public ban(): void {
    this._http
      .post<User[]>(`/knihovna/api/user/ban/${this.user.id}`, {
        observe: 'response',
      })
      .subscribe({
        next: () => {
          this._userS.updateUser();
          this._userS.fetch();
        },
        error: (error: any) => {},
      });
  }

  public unban(): void {
    this._http
      .post<User[]>(`/knihovna/api/user/unban/${this.user.id}`, {
        observe: 'response',
      })
      .subscribe({
        next: () => {
          this._userS.updateUser();
          this._userS.fetch();
        },
        error: (error: any) => {},
      });
  }

  public edit(): void {
    this._userS.actualUserId.next(this.user.id);
    this._router.navigate(['/', 'profile']);
  }
}
