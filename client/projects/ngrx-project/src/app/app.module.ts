import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {APP_ROUTERS} from './app-routing.module';
import {select, Store, StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {metaReducers, ROOT_REDUCERS, selectHome, State} from './store/reducer';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import * as fromRoot from '../app/store/reducer/test.reducer';
import {CoreModule} from './core/core.module';
import {RootComponent} from './core/containers/root/root.component';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './containers/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RootEffects} from './store/effects/root.effects';
import {FlexModule} from '@angular/flex-layout';
import {LgkGrid} from './components/lgk-grid/lgk-grid';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {MatDividerModule} from '@angular/material/divider';

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    HomeComponent,
    LgkGrid
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,


    APP_ROUTERS,


    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    // StoreModule.forRoot(ROOT_REDUCERS, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true,
    //     strictStateSerializability: true,
    //     strictActionSerializability: true,
    //   },
    // }),

    StoreModule.forRoot(ROOT_REDUCERS, {metaReducers}),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store App',

      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot([RootEffects/*UserEffects, RouterEffects*/]),
    FlexModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [
    RootComponent
  ]
})
export class AppModule {

  constructor(private store: Store<State>) {
    console.log('--------------------');
    console.log(ROOT_REDUCERS);
    console.log('--------------------');

    this.store.pipe(select(selectHome)).subscribe(value => {
      console.log('HOLA COMO ANDAS ' + value);
    });

    this.store.dispatch(fromRoot.homeScore());
  }
}
