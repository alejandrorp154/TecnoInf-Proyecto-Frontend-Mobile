import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BajaEventoPageRoutingModule } from './baja-evento-routing.module';

import { BajaEventoPage } from './baja-evento.page';
import { NavbarComponent } from '../UI/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BajaEventoPageRoutingModule
  ],
  declarations: [BajaEventoPage, NavbarComponent]
})
export class BajaEventoPageModule {}
