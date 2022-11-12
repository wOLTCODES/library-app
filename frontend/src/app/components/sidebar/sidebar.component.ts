import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../model/User";
import {AppComponent} from "../../app.component";
import {UserServiceService} from "../../services/user-service.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public numberOfPendings: number = 0

  constructor(private _http: HttpClient, private _router: Router, public userService: UserServiceService) {}

  ngOnInit(): void {

    this.fetchNumberOfPendings()
    this.initInterval()
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
