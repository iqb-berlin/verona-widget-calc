import { Injectable } from '@angular/core';

import { WidgetDefinition } from '../models/widget-definition';

@Injectable({
  providedIn: 'root'
})

export class WidgetService {
  parameters:Record<string, string>[] = [];
  sharedParameters:Record<string, string>[] = [];
  state:string = '';

  reset() {
    this.parameters = [];
    this.sharedParameters = [];
    this.state = '';
  }

  setNewData(widgetDefinition: unknown) {
    this.reset();
    const def = widgetDefinition as WidgetDefinition;
    console.log('new widget definition: ', def);
    this.state = def.state || '';
    this.parameters = def.parameters || [];
    this.sharedParameters = def.sharedParameters || [];
  }
}
