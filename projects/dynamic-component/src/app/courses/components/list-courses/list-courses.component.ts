import { Component, OnInit } from '@angular/core';
import {Course} from '../../domain/course';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor() { }

  ngOnInit() {
  }

}
