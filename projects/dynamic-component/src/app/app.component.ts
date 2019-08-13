import {Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ToolbarOptions} from './commons/toolbar.options';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {ConnectionPositionPair, Overlay, OverlayConfig, PositionStrategy} from '@angular/cdk/overlay';
import {ResolverService} from './commons/resolver.service';

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

  constructor(
    public viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private overlay: Overlay,
    private localResolver: ComponentFactoryResolver,
    private injector: Injector,
    private resolverService: ResolverService
  ) {

    console.log("AppComponent" + this.resolverService.n);

    this.resolverService.contextReceived$.subscribe(data => {
      console.log("HOLA");
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
    });
  }

  private getOverlayConfig(origin, width, height): OverlayConfig {
    return new OverlayConfig({
      width,
      height,
      hasBackdrop: false,
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

// Create Dynamic Form
  openForm(container: HTMLDivElement) {
    const childComponent = this.remoteComponentFactoryResolver.resolveComponentFactory(event.snapshot.data.search.component);
    this.searchFormComponentRef = this.viewContainerRef.createComponent(childComponent, 0, this.remoteInjector);
    const overlayRef = this.overlay.create(this.getOverlayConfig(container, container.clientWidth, container.clientHeight));
  }
}
