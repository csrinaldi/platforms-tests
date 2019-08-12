import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCoursesComponent} from './components/list-courses/list-courses.component';
import {CourseSearchFormComponent} from './components/course-search-form/course-search-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListCoursesComponent,
    data: {
      search: {
        component: CourseSearchFormComponent
      }
    }
  },
];

export const SCHEDULER_ROUTERS: ModuleWithProviders = RouterModule.forChild(routes);
