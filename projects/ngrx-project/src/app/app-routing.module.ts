import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './containers/home/home.component';
import {AuthGuard} from './core/services/authGuard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      toolbar: true
    }
  },

  {
    path: 'courses',
    data: {
      toolbar: true
    },
    loadChildren: () =>
      import('courses-lib').then(module => module.CourseModule),
      //canActivate: [AuthGuard],
  },


];

export const APP_ROUTERS: ModuleWithProviders = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true });
