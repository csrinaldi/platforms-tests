import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  private _n: number;

  constructor() {
    this._n = Math.random();
  }

  contextReceivedSource = new Subject<any>();
  contextReceived$ = this.contextReceivedSource.asObservable();

  receiveContext(componentFactoryResolver: ComponentFactoryResolver, injector: Injector) {
    console.log("ResolverService");
    this.contextReceivedSource.next({resolver: componentFactoryResolver, injector});
  }


  get n(): number {
    return this._n;
  }
}
