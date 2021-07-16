import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEventoPageRoutingModule } from './alta-evento-routing.module';

import { AltaEventoPage } from './alta-evento.page';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { MapaModule } from '../UI/mapa/mapa.module';
import { AltaPublicacionComponent } from '../UI/alta-publicacion/alta-publicacion.component';

@NgModule({
  imports: [ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEventoPageRoutingModule,
    NavbarModule,
    MapaModule
  ],
  declarations: [AltaEventoPage,AltaPublicacionComponent]
})
export class AltaEventoPageModule {}
