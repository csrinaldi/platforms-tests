import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './containers/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  },
];

export const CHATS_ROUTERS: ModuleWithProviders = RouterModule.forChild(routes);
