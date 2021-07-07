import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriaPageRoutingModule } from './galeria-routing.module';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { GaleriaPage } from './galeria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaPageRoutingModule,
    NavbarModule
  ],
  declarations: [GaleriaPage]
})
export class GaleriaPageModule {}
