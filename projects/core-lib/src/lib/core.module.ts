import { NgModule } from '@angular/core';
import {CommonsLibModule} from "commons-lib";
import {RouterModule} from "@angular/router";
import {LayoutComponent} from "./components/layout.component/layout.component";
import {SidenavComponent} from "./components/sidenav.component/sidenav.component";
import {CommonModule} from "@angular/common";
import {AppComponent} from "./containers";
import {StoreModule} from "@ngrx/store";
import {LayoutStore} from "./store/reducers";

export const CONTAINERS = [
  AppComponent
];

export const COMPONENTS = [
  LayoutComponent,
  SidenavComponent
  // NavItemComponent,
  // ToolbarComponent,
];

@NgModule({
  declarations: [
    CONTAINERS,
    COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonsLibModule,
    StoreModule.forFeature(LayoutStore.layoutFeatureKey, LayoutStore.reducer)
  ],
  exports: [
    CONTAINERS,
    COMPONENTS
  ]
})
export class CoreLibModule { }
