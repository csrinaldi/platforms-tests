import {OverlayRef} from '@angular/cdk/overlay';

export class CommonOverlayRef<T> {

  // tslint:disable-next-line:variable-name
  private _instance: T;

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }


  get instance() {
    return this._instance;
  }

  set instance(value) {
    this._instance = value;
  }
}
