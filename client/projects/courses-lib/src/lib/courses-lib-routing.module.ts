import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCoursesComponent} from './containers/list-courses/list-courses.component';
import {CourseSearchFormComponent} from './components/course-search-form-component/course-search-form.component';
import {CoursesResolver} from './services/courses.resolver';


const routes: Routes = [
  {
    path: '',
    component: ListCoursesComponent,
    resolve: { courses$ : CoursesResolver },
    data: {
      search: {
        component: CourseSearchFormComponent
      }
    }
  },
];

export const SCHEDULER_ROUTERS: ModuleWithProviders = RouterModule.forChild(routes);
