import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriaModalPageRoutingModule } from './galeria-modal-routing.module';

import { GaleriaModalPage } from './galeria-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaModalPageRoutingModule
  ],
  declarations: [GaleriaModalPage]
})
export class GaleriaModalPageModule {}
