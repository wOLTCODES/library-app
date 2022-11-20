import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../model/User';
import { AppComponent } from '../../../app.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public numberOfPendings: number = 0;
  public pendingsTitle: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchNumberOfPendings();
    this.initInterval();
  }

  public get getTitle() {
    return this.userService.getUser()?.isAdmin
      ? 'All users history'
      : 'My history';
  }

  fetchNumberOfPendings() {
    this._http
      .get('/knihovna/api/user/pending/number', { observe: 'response' })
      .subscribe({
        next: (response) => {
          this.numberOfPendings = (response.body as { number: number }).number;
          this.pendingsTitle = `Pendings (${this.numberOfPendings})`;
        },
        error: (error: any) => {},
      });
  }

  initInterval() {
    setInterval(() => {
      if (this.userService.getUser()) {
        this.fetchNumberOfPendings();
      }
    }, 5000);
  }

  logout() {
    this._http
      .get('/knihovna/api/user/logout', { observe: 'response' })
      .subscribe({
        next: (response) => {
          this._router.navigate(['login']);
        },
        error: (error: any) => {},
      });
  }
}
