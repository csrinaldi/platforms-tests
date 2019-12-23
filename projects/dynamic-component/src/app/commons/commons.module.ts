import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {OverlayModule} from '@angular/cdk/overlay';
import {ResolverService} from './resolver.service';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    OverlayModule
  ]
})
export class MaterialModule {
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule
  ]
})
export class CommonsModule {
  static forRoot(): ModuleWithProviders<CommonsModule> {
    return {
      ngModule: CommonsModule,
      providers: [
        ResolverService
      ]
    };
  }
}
