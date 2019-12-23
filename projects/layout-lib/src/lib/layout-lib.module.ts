import { NgModule } from '@angular/core';
import {CommonsLibModule} from "commons-lib";
import {LayoutComponent} from "./components/layout-component/layout.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    RouterModule,
    CommonsLibModule
  ],
  exports: [LayoutComponent]
})
export class LayoutLibModule { }
