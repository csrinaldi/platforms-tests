import {Component, ComponentFactoryResolver, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ToolbarOptions} from './commons/toolbar.options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('searchChildOption', { read: ViewContainerRef, static: false })
  private searchFormContainer: ViewContainerRef;

  private componentFactoryResolver: ComponentFactoryResolver;
  private injector: Injector;

  private searchFormComponentRef: ComponentRef<any>;

  constructor() {
  }

// Create Dynamic Form
  openForm(container: HTMLDivElement) {
    if (toolbarOptions.searchForm) {

      const childComponent = this.componentFactoryResolver.resolveComponentFactory(toolbarOptions.searchForm);
      this.searchFormComponentRef = this.searchFormComponent.createComponent(childComponent, 0, this.injector);
    }
  }



}
