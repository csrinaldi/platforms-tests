import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonsLibModule} from "commons-lib";
import {ListCoursesComponent} from "./components/list-courses/list-courses.component";
import {CourseSearchFormComponent} from "./components/course-search-form-component/course-search-form.component";
import {SCHEDULER_ROUTERS} from "./courses-lib-routing.module";
import {CoursesService} from "./services/courses.service";
import {CoursesFakeBackendInterceptor} from "./_helper/courses.fake.backend";

@NgModule({
  declarations: [
    ListCoursesComponent,
    CourseSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonsLibModule,
    // StoreModule.forFeature('courses', fromShips.reducer),
    // EffectsModule.forFeature([ShipsEffects]),
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
