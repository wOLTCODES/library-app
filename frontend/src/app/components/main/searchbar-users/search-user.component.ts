import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  @ViewChild('firstName') firstName: ElementRef<HTMLInputElement>;
  @ViewChild('lastName') lastName: ElementRef<HTMLInputElement>;
  @ViewChild('address') address: ElementRef<HTMLInputElement>;
  @ViewChild('birthNumber') birthNumber: ElementRef<HTMLInputElement>;

  public url: string;

  public toggleValue$ = new BehaviorSubject<boolean>(false);

  constructor(public userS: UserService) {}

  ngOnInit(): void {}

  public getParameters(): void {
    this.url = '/knihovna/api/user?';
    const firstName = this.firstName.nativeElement.value;

    if (firstName) {
      if (this.url.length === 19) {
        this.url += 'firstName=' + encodeURIComponent(firstName);
      } else {
        this.url += '&' + 'firstName=' + encodeURIComponent(firstName);
      }
    }
    const lastName = this.lastName.nativeElement.value;
    if (lastName) {
      if (this.url.length === 19) {
        this.url += 'lastName=' + encodeURIComponent(lastName);
      } else {
        this.url += '&' + 'lastName=' + encodeURIComponent(lastName);
      }
    }
    const address = this.address.nativeElement.value;
    if (address) {
      if (this.url.length === 19) {
        this.url += 'address=' + encodeURIComponent(address);
      } else {
        this.url += '&' + 'address=' + encodeURIComponent(address);
      }
    }
    const birthNumber = this.birthNumber.nativeElement.value;
    if (birthNumber) {
      if (this.url.length === 19) {
        this.url += 'birthNumber=' + encodeURIComponent(birthNumber);
      } else {
        this.url += '&' + 'birthNumber=' + encodeURIComponent(birthNumber);
      }
    }

    if (this.toggleValue$.value) {
      if (this.url.length === 19) {
        this.url += 'filterType=' + 'OR';
      } else {
        this.url += '&' + 'filterType=' + 'OR';
      }
    } else {
      if (this.url.length === 19) {
        this.url += 'filterType=' + 'AND';
      } else {
        this.url += '&' + 'filterType=' + 'AND';
      }
    }

    this.userS.endpointURLSearch.next(this.url);

    console.log('actual URL');
    console.log(this.userS.endpointURLSearch.value);

    this.userS.fetchSearch();
  }

  public toggleStatus(event: any) {
    if (event.target.checked) {
      this.toggleValue$.next(true);
    } else {
      this.toggleValue$.next(false);
    }
  }
}
