import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonsLibModule} from "commons-lib";
import {ListCoursesComponent} from "./components/list-courses/list-courses.component";
import {CourseSearchFormComponent} from "./components/course-search-form-component/course-search-form.component";
import {SCHEDULER_ROUTERS} from "./courses-lib-routing.module";

@NgModule({
  declarations: [
    ListCoursesComponent,
    CourseSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsLibModule,
    SCHEDULER_ROUTERS
  ],
  exports: [
    CourseSearchFormComponent
  ],
  entryComponents: [
    CourseSearchFormComponent
  ],
  providers: [],
})
export class CourseModule {
}
