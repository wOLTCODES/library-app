import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
  @Input() asset: any;

  constructor() {}

  ngOnInit(): void {}
}
