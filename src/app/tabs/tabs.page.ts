import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

  currentTab = 'home';
  constructor() {}

  setCurrentTab(tabEvent: any) {
    this.currentTab = tabEvent.tab;
  }

}
