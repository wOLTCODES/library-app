import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    //fetch all books
    this._http
      .get('/knihovna/api/borrow/history/<userid>', { observe: 'response' })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: any) => {},
      });
  }
}
