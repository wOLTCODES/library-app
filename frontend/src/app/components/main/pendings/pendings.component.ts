import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/User';
import { BehaviorSubject } from 'rxjs';
import { PendingsService } from 'src/app/services/pendings.service';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss'],
})
export class PendingsComponent implements OnInit {
  constructor(public pendingsS: PendingsService) {}

  ngOnInit(): void {
    this.pendingsS.fetch();
  }
}
