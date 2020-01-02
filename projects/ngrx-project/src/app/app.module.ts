import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {StoreModule} from "@ngrx/store";
import {LayoutComponent, LayoutLibModule} from "layout-lib";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RootStoreModule } from './root-store/root-store.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutLibModule,
    AppRoutingModule,
    RootStoreModule,
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // }),
    // EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
