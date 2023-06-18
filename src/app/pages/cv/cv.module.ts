import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CvPageRoutingModule } from './cv-routing.module';

import { CvPage } from './cv.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CvPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CvPage]
})
export class CvPageModule {}
