import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from '../../../core-lib/src/lib/components/layout.component/layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {CommonsLibModule} from '../../../commons-lib/src/lib/commons-lib.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonsLibModule.forRoot(),
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule {
}
