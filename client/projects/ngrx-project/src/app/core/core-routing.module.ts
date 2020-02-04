import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './containers/login/login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      toolbar: false
    }
  },
  // {path: '**', component: NoPageFoundComponent}
];

export const CORE_ROUTERS = RouterModule.forChild(routes);
