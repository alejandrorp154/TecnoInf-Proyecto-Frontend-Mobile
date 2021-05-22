import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEventoPageRoutingModule } from './alta-evento-routing.module';

import { AltaEventoPage } from './alta-evento.page';
import { MapaComponent } from '../mapa/mapa.component';
import { NavbarComponent } from '../navbar/navbar.component';


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
