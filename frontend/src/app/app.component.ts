import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'library';

  constructor(public router: Router) {}

  public static throwExpression(message?: string) {
    throw new Error(message)
  }
}
