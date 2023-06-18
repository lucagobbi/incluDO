import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GestureController} from "@ionic/angular";
import {fadeNSlideIn} from "../animations/animations";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  animations: [
    fadeNSlideIn
  ]
})
export class TabsPage implements AfterViewInit {

  currentTab = 'home';

  showTabs = true;

  constructor(
    private gestureController: GestureController
  ) {}

  ngAfterViewInit() {
    const show = this.gestureController.create({
      gestureName: "show",
      el: document.getElementById('body') as HTMLElement,
      threshold: 0,
      onEnd: ev => {
        if (ev.deltaY < -150 && ev.velocityY < -0.15) {
          this.showTabs = true;
        } else if (ev.deltaY > 150 && ev.velocityY > 0.15) {
          this.showTabs = false;
        }
      }
    }, true);
    show.enable(true);
  }

  setCurrentTab(tabEvent: any) {
    this.currentTab = tabEvent.tab;
  }
}
