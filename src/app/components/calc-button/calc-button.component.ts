import { Component, input, output } from "@angular/core";

import { Button, ButtonType } from "../../models/widget-definition";

@Component({
  selector: 'calc-button',
  templateUrl: './calc-button.component.html',
  styleUrls: ['./calc-button.component.scss']
})

export class CalcButtonComponent {
  label = input('');
  value = input('');
  type = input<ButtonType>('DEFAULT');
  addValue = output<Button>();

  onClick() {
    this.addValue.emit({
      value: this.value(),
      label: this.label()
    });
  }
}
