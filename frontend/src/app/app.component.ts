import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'library';

  constructor(public router: Router, private _userService: UserService) {
    _userService.updateUser();
  }

  public static throwExpression(message?: string) {
    throw new Error(message);
  }
}
