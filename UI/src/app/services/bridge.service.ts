import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { BridgeButtonComponent } from '../components/bridge/bridge-button.component';

@Injectable()
export class BridgeService {

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector
  ) { }

  appendButton(line: any) {

    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(BridgeButtonComponent)
      .create(this.injector);
    
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);
    
    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    
    // 4. Append DOM element to the body
    const main = document.querySelector('body');

    main.appendChild(domElem);

    const buttonClientRect = domElem.getBoundingClientRect();
    const buttonWidth = buttonClientRect.width;
    const buttonHeight = buttonClientRect.height;
    
    const { top, left, height, width } = line.getBoundingClientRect();
    const x = width / 2 + left - buttonWidth / 2;
    const y = height / 2 + top - buttonHeight / 2;

    domElem.style.top = y + 'px';
    domElem.style.left = x + 'px';
    domElem.style.zIndex = '1';
  }
}