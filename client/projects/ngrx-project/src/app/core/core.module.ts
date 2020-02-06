import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CORE_ROUTERS} from './core-routing.module';
import {RootComponent} from './containers/root/root.component';
import {LayoutComponent} from './components/layout/layout.component';
import {CommonsLibModule} from 'commons-lib';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {StoreModule} from '@ngrx/store';
import * as forCore from './store/reducers';
import {fakeBackendProvider} from './helpers';
import {AuthService} from './services/auth.service';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {AuthGuard} from './services/authGuard';
import {HttpClientModule} from '@angular/common/http';
import {NoPageFoundComponent} from './components/no-page-found/no-page-found.component';
import {LoginComponent} from './containers/login/login.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AccountsEffects, LayoutEffects} from './store/effects';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountService} from './services/accounts.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [RootComponent, LayoutComponent, SidenavComponent, ToolbarComponent, NoPageFoundComponent, LoginComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonsLibModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,

    StoreModule.forFeature(forCore.layoutFeatureKey, forCore.layoutReducer),
    StoreModule.forFeature(forCore.securityFeatureKey, forCore.authReducer),
    StoreModule.forFeature(forCore.accountsFeatureKey, forCore.acccoutsReducer),
    EffectsModule.forFeature([AuthEffects, LayoutEffects, AccountsEffects]),
    CORE_ROUTERS
  ],
  exports: [
    RootComponent,
    LoginComponent
  ],
  providers: [
    fakeBackendProvider,
    AuthService,
    AuthGuard,
    AccountService
  ]
})
export class CoreModule {
}
