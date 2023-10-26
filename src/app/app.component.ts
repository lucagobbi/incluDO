import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  constructor(
  ) { }

  ngOnInit(): void {
    initFlowbite();
  }

}
