import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss']
})
export class PendingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fetch() {
    //fetch all books
    this._http
      .get('/knihovna/api/user/pending', {observe: 'response'})
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error: any) => {
          if (error.status === 401) {

          }
        },
      });
  }

}
