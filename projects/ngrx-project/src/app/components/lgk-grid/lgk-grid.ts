import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'lgk-grid',
  templateUrl: './lgk-grid.html',
  styleUrls: ['./lgk-grid.css']
})
export class LgkGrid implements OnDestroy, AfterContentInit, AfterViewInit, AfterViewChecked {

  tiles = [];


  constructor() {
    for ( let idx = 0; idx < 35; idx++) {
      if ( idx === 20 ) {
        this.tiles.push({
          text: 'One', cols: 1, rows: 1, color: 'white',
        });
      } else {
        this.tiles.push({
          text: 'One', cols: 1, rows: 1, color: 'white'
        });
      }

    }

  }

  ngAfterContentInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onMouseOver(e) {
    console.log(e);
  }



}
