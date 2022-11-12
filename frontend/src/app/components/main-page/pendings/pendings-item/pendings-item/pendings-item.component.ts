import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../../../../model/Book";
import {User} from "../../../../../model/User";
import {faUserCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-pendings-item',
  templateUrl: './pendings-item.component.html',
  styleUrls: ['./pendings-item.component.scss']
})
export class PendingsItemComponent implements OnInit {
  @Input() user: User;
  faCheck = faUserCheck
  constructor() { }

  ngOnInit(): void {
  }

}
