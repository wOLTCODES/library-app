import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('inputValueRef') inputValue: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  getInputValue(): void {
    console.log(this.inputValue.nativeElement.value);
  }
}
