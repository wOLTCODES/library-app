import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(public userS: UserService) {}

  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  ngOnInit(): void {
    this.userS.fetch();
  }
}
