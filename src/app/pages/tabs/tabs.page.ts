import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  activeTab = 'vip';
  constructor() { }

  selectedTabChanged(event: { tab: string }): void {
    if (!event.tab || event.tab === this.activeTab) { return; }

    this.activeTab = event.tab;
  }
}
