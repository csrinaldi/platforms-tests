import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CORE_ROUTERS} from './core-routing.module';
import {RootComponent} from './containers/root/root.component';
import {LayoutComponent} from './components/layout/layout.component';
import {CommonsLibModule} from "commons-lib";
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {StoreModule} from "@ngrx/store";
import * as forCore from './store/reducers';
import {fakeBackendProvider} from "./helpers";
import {AuthService} from "./services/AuthService";
import {EffectsModule} from "@ngrx/effects";
import {SecurityEffects} from "./store/effects/security.effects";
import {HomeComponent} from "./containers/home/home.component";
import {AuthGuard} from "./services/authGuard";
import {HttpClientModule} from "@angular/common/http";
import {NoPageFoundComponent} from "./components/no-page-found/no-page-found.component";
import {LoginComponent} from "./containers/login/login.component";


@NgModule({
  declarations: [RootComponent, LayoutComponent, SidenavComponent, ToolbarComponent, HomeComponent, NoPageFoundComponent, LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonsLibModule,
    StoreModule.forFeature(forCore.layoutFeatureKey, forCore.layoutReducer ),
    StoreModule.forFeature(forCore.securityFeatureKey, forCore.securityReducer ),
    EffectsModule.forFeature([SecurityEffects]),
    CORE_ROUTERS
  ],
  exports: [
    RootComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    fakeBackendProvider,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }
