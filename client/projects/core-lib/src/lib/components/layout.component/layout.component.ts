import {Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {GenericSearchComponent, ResolverService} from 'commons-lib';
import {Observable} from 'rxjs';
import {LayoutStore} from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {LayoutActions} from '../../store/actions';


@Component({
  selector: 'lgk-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('searchChildOption', {read: ViewContainerRef})
  private searchFormContainer: ViewContainerRef;

  private remoteComponentFactoryResolver: ComponentFactoryResolver;
  private remoteInjector: Injector;

  private searchFormComponentRef: ComponentRef<any>;
  private searchFormComponent: Type<any>;
  hasSearch = false;

  showSidenav$: Observable<boolean>;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private overlay: Overlay,
    private localResolver: ComponentFactoryResolver,
    private injector: Injector,
    private resolverService: ResolverService,
    private store: Store<LayoutStore.State>
  ) {

    console.log('AppComponent' + this.resolverService.n);

    console.log('-----Store-------');
    console.log(store);
    console.log(select(LayoutStore.selectShowSidenav)(store));
    console.log('-------------------');

    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(LayoutStore.selectShowSidenav));

    this.showSidenav$.subscribe(value => console.log('HOLA Che como andas: ' + value));

    this.resolverService.contextReceived$.subscribe(data => {
      this.remoteComponentFactoryResolver = data.resolver;
      this.remoteInjector = data.injector;
    });
  }


  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  toggle() {
    this.store.dispatch(LayoutActions.toggleSidenav());
  }

  private getOverlayPosition(origin: HTMLElement): PositionStrategy {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);

    return positionStrategy;
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
    ];
  }

  ngOnInit(): void {

    this.store.select(state => state.showSidenav).subscribe(value => console.log('HOLA1 ' + value));

    console.log(this.store.pipe(select(LayoutStore.selectShowSidenav)));


    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map((event) => {
    //     console.log('EVENT: ', event);
    //     return this.activatedRoute;
    //   }),
    //   map((route) => {
    //
    //     while (route.snapshot.data.searchForm === undefined && route.firstChild) {
    //       route = route.firstChild;
    //     }
    //     return route;
    //   })
    // ).subscribe((event: ActivatedRoute) => {
    //   if (event.snapshot.data.search !== undefined && event.snapshot.data.search.component !== undefined) {
    //     this.searchFormComponent = event.snapshot.data.search.component;
    //     this.hasSearch = true;
    //   } else {
    //     this.hasSearch = false;
    //   }
    // });
  }

  private getOverlayConfig(origin, width, height): OverlayConfig {
    return new OverlayConfig({
      width,
      hasBackdrop: false,
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

// Create Dynamic Form
  openForm(container: HTMLDivElement) {

    const componentPortal: ComponentPortal<any> = new ComponentPortal(this.searchFormComponent, this.viewContainerRef, this.remoteInjector, this.remoteComponentFactoryResolver);
    const overlayRef = this.overlay.create(this.getOverlayConfig(container, container.clientWidth, container.clientHeight));
    const componentRef: ComponentRef<any> = overlayRef.attach(componentPortal);
    const instance: GenericSearchComponent<any, any> = componentRef.instance as GenericSearchComponent<any, any>;
    instance.afterSearched$.subscribe((data) => {
      console.log(data);
      overlayRef.detach();
    });

    instance.afterClosed$.subscribe(value => {
      overlayRef.detach();
    });
  }


}
