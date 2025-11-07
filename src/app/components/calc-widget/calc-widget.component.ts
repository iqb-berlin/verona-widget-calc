import { Component, input, output, signal } from "@angular/core";
import * as math from 'mathjs';

import { CalcButtonComponent } from "../calc-button/calc-button.component";
import {Button} from "../../models/widget-definition";

@Component({
  selector: 'calc-widget',
  templateUrl: './calc-widget.component.html',
  imports: [
    CalcButtonComponent
  ],
  styleUrls: ['./calc-widget.component.scss']
})

export class CalcWidgetComponent {
  parameters = input<Record<string, string>>({});
  sharedParameters = input<Record<string, string>>({});
  value = output<string>();
  displayValue = signal<string>('0');
  expression = signal<string>('');

  addValue(event: Button) {
    if (this.displayValue() === '0') {
      this.displayValue.set(event.label);
    } else {
      if (event.label === 'x²') {
        this.displayValue.set(this.displayValue() + '²');
      } else {
        this.displayValue.set(this.displayValue() + event.label);
      }
    }
    this.expression.set(this.expression() + event.value);
  }

  deleteValue() {
    this.displayValue.set(this.displayValue().slice(0, -1));
    if (this.displayValue() === '') {
      this.displayValue.set('0');
    }
    this.expression.set(this.expression().slice(0, -1));
  }

  deleteAll() {
    this.displayValue.set('0');
    this.expression.set('');
  }

  submit() {
    let expressionValue: number | undefined = undefined;
    try {
      expressionValue = math.evaluate(this.expression());
    } catch (error) {
      console.error('Math: expression could not be solved', error);
    }

    if (expressionValue !== undefined) {
      this.value.emit(expressionValue.toString());
      this.displayValue.set(expressionValue.toString());
      this.expression.set(expressionValue.toString());
    }
  }
}