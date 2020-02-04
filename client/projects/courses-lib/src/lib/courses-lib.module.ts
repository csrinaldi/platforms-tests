import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonsLibModule} from 'commons-lib';
import {ListCoursesComponent} from './containers/list-courses/list-courses.component';
import {CourseSearchFormComponent} from './components/course-search-form-component/course-search-form.component';
import {SCHEDULER_ROUTERS} from './courses-lib-routing.module';
import {CoursesService} from './services/courses.service';
import {CoursesFakeBackendInterceptor} from './_helper/courses.fake.backend';
import {CourseStoreModule} from './store';
import {CoursesResolver} from "./services/courses.resolver";
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    ListCoursesComponent,
    CourseSearchFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
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
    CoursesResolver,
    CoursesService
  ],
})
export class CourseModule {
}
