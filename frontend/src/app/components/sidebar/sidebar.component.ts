import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public numberOfPendings: number = 0
  public user: User = {} as User

  constructor(private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentUserInfo()
    this.fetchNumberOfPendings()
    this.initInterval()
  }

  fetchCurrentUserInfo() {
    this._http
      .get<User>('/knihovna/api/user/current-user', {observe: 'response'})
      .subscribe({
        next: (response) => {
          let user = response.body
          if (user == null) {
            throw new Error('No body')
          }
          this.user = user
        },
        error: (error: any) => {

        },
      });
  }

  fetchNumberOfPendings() {
    this._http
      .get('/knihovna/api/user/pending/number', {observe: 'response'})
      .subscribe({
        next: (response) => {
          this.numberOfPendings = (response.body as {number: number}).number
        },
        error: (error: any) => {

        },
      });
  }

  initInterval() {
    setInterval(()=>{
      this.fetchNumberOfPendings()
    }, 5000)
  }

  logout() {
    this._http
      .get('/knihovna/api/user/logout', {observe: 'response'})
      .subscribe({
        next: (response) => {
          this._router.navigate(['login'])
        },
        error: (error: any) => {

        },
      });
  }
}
