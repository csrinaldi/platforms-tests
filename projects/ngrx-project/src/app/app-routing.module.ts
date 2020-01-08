import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

export const APP_ROUTERS: ModuleWithProviders = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true });
