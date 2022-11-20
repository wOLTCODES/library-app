import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../model/User';
import {
  faDownLong,
  faHammer,
  faUpLong,
  faUserSlash,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private _userS: UserService, private _http: HttpClient) {}

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
}
