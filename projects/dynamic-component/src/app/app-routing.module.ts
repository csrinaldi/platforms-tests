import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCoursesComponent} from './courses/components/list-courses/list-courses.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/course.module').then(m => m.CourseModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
