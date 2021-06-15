import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEventoPageRoutingModule } from './alta-evento-routing.module';

import { AltaEventoPage } from './alta-evento.page';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { MapaModule } from '../UI/mapa/mapa.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEventoPageRoutingModule,
    NavbarModule,
    MapaModule
  ],
  declarations: [AltaEventoPage]
})
export class AltaEventoPageModule {}
