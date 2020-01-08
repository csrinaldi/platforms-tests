import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./containers/home/home.component";
import {AuthGuard} from "./services/authGuard";
import {NoPageFoundComponent} from "./components/no-page-found/no-page-found.component";
import {LoginComponent} from "./containers/login/login.component";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: NoPageFoundComponent }
];

export const CORE_ROUTERS = RouterModule.forChild(routes);
