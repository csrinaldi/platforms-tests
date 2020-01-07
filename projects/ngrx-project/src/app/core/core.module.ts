import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { RootComponent } from './containers/root/root.component';
import { LayoutComponent } from './components/layout/layout.component';
import {CommonsLibModule} from "commons-lib";
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {StoreModule} from "@ngrx/store";
import * as forCore from './store/reducers';


@NgModule({
  declarations: [RootComponent, LayoutComponent, SidenavComponent, ToolbarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    CommonsLibModule,
    StoreModule.forFeature(forCore.layoutFeatureKey, forCore.layoutReducer ),
    StoreModule.forFeature(forCore.securityFeatureKey, forCore.securityReducer ),
  ],
  exports: [
    RootComponent
  ]

})
export class CoreModule { }
