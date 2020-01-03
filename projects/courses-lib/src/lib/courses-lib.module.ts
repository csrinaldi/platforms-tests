import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonsLibModule} from '@logikas/commons-lib';
import {ListCoursesComponent} from './components/list-courses/list-courses.component';
import {CourseSearchFormComponent} from './components/course-search-form-component/course-search-form.component';
import {SCHEDULER_ROUTERS} from './courses-lib-routing.module';
import {CoursesService} from './services/courses.service';
import {CoursesFakeBackendInterceptor} from './_helper/courses.fake.backend';
import {CourseStoreModule} from './store';

@NgModule({
  declarations: [
    ListCoursesComponent,
    CourseSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsLibModule,
    CourseStoreModule,
    SCHEDULER_ROUTERS
  ],
  exports: [
    CourseSearchFormComponent
  ],
  entryComponents: [
    CourseSearchFormComponent
  ],
  providers: [
    CoursesFakeBackendInterceptor,
    CoursesService
  ],
})
export class CourseModule {
}
