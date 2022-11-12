import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../model/User";
import {faDownLong, faHammer, faUpLong, faUserSlash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss']
})
export class UsersItemComponent implements OnInit {
  @Input() user: User;
  faUp = faUpLong
  faDown = faDownLong
  faBan = faHammer
  faUnban = faUserSlash

  constructor() { }

  ngOnInit(): void {
  }

}
