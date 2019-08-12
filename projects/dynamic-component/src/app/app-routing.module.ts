import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCoursesComponent} from './courses/components/list-courses/list-courses.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses', pathMatch: 'full'
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/course.module').then(m => m.CourseModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
