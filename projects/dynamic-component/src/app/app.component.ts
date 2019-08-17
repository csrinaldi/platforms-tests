import {Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy} from '@angular/cdk/overlay';
import {ResolverService} from './commons/resolver.service';
import {ComponentPortal} from '@angular/cdk/portal';
import {GenericSearchComponent} from './commons/generic-search-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('searchChildOption', {read: ViewContainerRef, static: false})
  private searchFormContainer: ViewContainerRef;

  private remoteComponentFactoryResolver: ComponentFactoryResolver;
  private remoteInjector: Injector;

  private searchFormComponentRef: ComponentRef<any>;
  private searchFormComponent: Type<any>;
  hasSearch = false;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private overlay: Overlay,
    private localResolver: ComponentFactoryResolver,
    private injector: Injector,
    private resolverService: ResolverService
  ) {

    console.log('AppComponent' + this.resolverService.n);

    this.resolverService.contextReceived$.subscribe(data => {
      this.remoteComponentFactoryResolver = data.resolver;
      this.remoteInjector = data.injector;
    });

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
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        console.log('EVENT: ', event);
        return this.activatedRoute;
      }),
      map((route) => {

        while (route.snapshot.data.searchForm === undefined && route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
    ).subscribe((event: ActivatedRoute) => {
      if (event.snapshot.data.search !== undefined && event.snapshot.data.search.component !== undefined) {
        this.searchFormComponent = event.snapshot.data.search.component;
        this.hasSearch = true;
      } else {
        this.hasSearch = false;
      }
    });
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
