import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelDerechoPageRoutingModule } from './panel-derecho-routing.module';

import { PanelDerechoPage } from './panel-derecho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelDerechoPageRoutingModule
  ],
  declarations: [PanelDerechoPage]
})
export class PanelDerechoPageModule {}
