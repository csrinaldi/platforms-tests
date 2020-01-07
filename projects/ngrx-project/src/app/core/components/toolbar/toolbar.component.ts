import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 's-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() title: string;
  @Input() logo$: Observable<string>;
  @Input() avatar$: Observable<string>;

  @Output() toggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }



}
