import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEventoPageRoutingModule } from './alta-evento-routing.module';

import { MapaComponent } from '../mapa/mapa.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AltaEventoPage } from './alta-evento.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEventoPageRoutingModule
  ],
  declarations: [AltaEventoPage, MapaComponent, NavbarComponent]
})
export class AltaEventoPageModule {}
