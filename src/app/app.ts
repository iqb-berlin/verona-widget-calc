import { Component, inject, OnInit, signal } from '@angular/core';

import { VeronaPostService } from '../../verona/src/lib/widget/verona-post.service';
import { VeronaSubscriptionService } from '../../verona/src/lib/widget/verona-subscription.service';

import { MetadataService } from './services/metadata.service';
import {CalcWidgetComponent} from "./components/calc-widget/calc-widget.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    CalcWidgetComponent
  ],
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected readonly title = signal('Widget Calculator');
  isStandalone = false;

  veronaPostService = inject(VeronaPostService);
  veronaSubscriptionService = inject(VeronaSubscriptionService);
  metaDataService = inject(MetadataService);

  ngOnInit() {
    this.veronaSubscriptionService.vowStartCommand
      .subscribe(vowStartCommand => {
        console.log('received vowStartCommand', vowStartCommand);
        this.veronaPostService.sessionID = vowStartCommand.sessionId;
      });
    this.isStandalone = window === window.parent;
    console.log('sending VowReadyNotification', this.metaDataService.playerMetadata);
    this.veronaPostService.sendVowReadyNotification(this.metaDataService.playerMetadata);
  }

  emitValue(value: string) {
    console.log('sending VowStateChangedNotification', value);
    this.veronaPostService.sendVowStateChangedNotification({
      state: value,
    })
  }
}
