import {OverlayRef} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {TemplateRef, Type} from '@angular/core';

// export type CloseEvent<T> = {
//   type: 'backdropClick' | 'close';
//   data: T;
// }

export type PopoverContent = TemplateRef<any> | Type<any> | string;

export class CustomOverlayref {

  // private afterClosed = new Subject()<CloseEvent<T>>();
  // afterClosed$ = this.afterClosed.asObservable();

  constructor(private overlayRef: OverlayRef, private component: any) {
  }




}
