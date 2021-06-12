import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BajaEventoPageRoutingModule } from './baja-evento-routing.module';

import { BajaEventoPage } from './baja-evento.page';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BajaEventoPageRoutingModule,
    NavbarModule
  ],
  declarations: [BajaEventoPage]
})
export class BajaEventoPageModule {}
