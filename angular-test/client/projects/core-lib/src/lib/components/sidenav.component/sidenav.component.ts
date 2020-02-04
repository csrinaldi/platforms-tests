import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lgk-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input('open')
  private _open = false;

  @Output() closeMenu = new EventEmitter();

  ngOnInit(): void {

  }

  get open(): boolean {
    console.log('get ' + this._open);
    return this._open;
  }

  set open(value: boolean) {
    console.log('set ' + value);
    this._open = value;
  }
}
