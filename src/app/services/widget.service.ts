import { Injectable } from '@angular/core';

import { WidgetDefinition } from '../models/widget-definition';

@Injectable({
  providedIn: 'root'
})

export class WidgetService {
  parameters:Record<string, string> = {};
  sharedParameters:Record<string, string> = {};

  reset() {
    this.parameters = {};
    this.sharedParameters = {};
  }

  setNewData(widgetDefinition: unknown) {
    this.reset();
    const def = widgetDefinition as WidgetDefinition;
    console.log('new widget definition: ', def);
  }
}
