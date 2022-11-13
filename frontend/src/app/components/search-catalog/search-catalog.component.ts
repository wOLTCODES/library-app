import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-catalog',
  templateUrl: './search-catalog.component.html',
  styleUrls: ['./search-catalog.component.scss'],
})
export class SearchCatalogComponent implements OnInit {
  @ViewChild('inputValueRef') inputValue: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  getInputValue(): void {
    console.log(this.inputValue.nativeElement.value);
  }
}
