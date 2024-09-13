import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlevarPageRoutingModule } from './llevar-routing.module';

import { LlevarPage } from './llevar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LlevarPageRoutingModule
  ],
  declarations: [LlevarPage]
})
export class LlevarPageModule {}
