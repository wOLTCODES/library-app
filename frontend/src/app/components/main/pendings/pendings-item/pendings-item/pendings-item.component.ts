import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../../model/User';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { PendingsService } from 'src/app/services/pendings.service';

@Component({
  selector: 'app-pendings-item',
  templateUrl: './pendings-item.component.html',
  styleUrls: ['./pendings-item.component.scss'],
})
export class PendingsItemComponent implements OnInit {
  @Input() user: User;
  faCheck = faUserCheck;

  constructor(private _http: HttpClient, private _pendingsS: PendingsService) {}

  ngOnInit(): void {}

  submitUser(): void {
    this._http
      .post(`/knihovna/api/user/review/${this.user.id}`, {
        observe: 'response',
      })
      .subscribe(() => {
        this._pendingsS.fetch();
      });
  }
}
