import {Component, ComponentFactoryResolver, Injector, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export interface Thread {


}

@Component({
  selector: 'chat-list',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  threads$: Thread[];

  constructor() {}

  ngOnInit() {
    // this.courses$ = this.route.snapshot.data['courses$'];
  }

}
