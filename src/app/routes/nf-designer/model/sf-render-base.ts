import { EventEmitter, inject, Output, ViewContainerRef } from '@angular/core';
import { SFComponent } from '@delon/form';
import { Subscription } from 'rxjs';

type NFComponentDefination<T> = T & {
  nfOnFormChange$?: EventEmitter<any>;
};

export class NFComponet extends SFComponent {
  nfOnFormChange$ = this.formChange;
}

type RenderForm<T = typeof NFComponet> = {
  component: new (...args: any[]) => T;
  config: Partial<T>;
};

export abstract class SfRenderBase {
  viewContainerRef = inject(ViewContainerRef);

  protected nfOnFormChange$ = new EventEmitter<any>();

  private lastComponentRef: any = null;

  private formChangeSubscription: Subscription | undefined = undefined;

  render<T>(form: RenderForm<T>) {
    const { config, component } = form;

    if (this.lastComponentRef) {
      this.viewContainerRef.clear();
      this.lastComponentRef = undefined;
    }

    const componentRef = this.viewContainerRef.createComponent(component);
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        (componentRef.instance as any)[key] = (config as any)[key];
      }
    }
    this.lastComponentRef = componentRef;

    // 订阅表单值变化事件
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe();
    }
    this.formChangeSubscription = (componentRef.instance as NFComponentDefination<any>)?.formChange?.subscribe((value: any) => {
      this.nfOnFormChange$.emit(value);
    });

    // @ts-ignore
    componentRef.instance.refreshSchema();

    return componentRef;
  }
}
