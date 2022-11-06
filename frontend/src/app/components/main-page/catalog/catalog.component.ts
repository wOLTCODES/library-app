import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Input() title = '';

  public assets: string[] = [
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
  ];

  constructor() {}

  ngOnInit(): void {}
}
