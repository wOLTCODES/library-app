import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public numberOfPendings = 0

  constructor(private _http: HttpClient) {}

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
          if (error.status === 401) {

          }
        },
      });
  }

  initInterval() {
    setInterval(()=>{
      this.fetchNumberOfPendings()
    }, 5000)
  }
}
