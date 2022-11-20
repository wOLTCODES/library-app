import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/User';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(public userS: UserService) {}

  ngOnInit(): void {
    this.userS.fetch();
  }
}
