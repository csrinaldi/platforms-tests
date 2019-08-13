import {NgModule} from '@angular/core';
import {ListCoursesComponent} from './components/list-courses/list-courses.component';
import {CourseSearchFormComponent} from './components/course-search-form/course-search-form.component';
import {SCHEDULER_ROUTERS} from './course-routing.module';
import {CommonsModule} from '../commons/commons.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListCoursesComponent,
    CourseSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsModule,
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
