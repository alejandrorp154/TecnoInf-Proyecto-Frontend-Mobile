import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarUbicacionesPageRoutingModule } from './visualizar-ubicaciones-routing.module';

import { VisualizarUbicacionesPage } from './visualizar-ubicaciones.page';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { MapaModule } from '../UI/mapa/mapa.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarUbicacionesPageRoutingModule,
    NavbarModule,
    MapaModule
  ],
  declarations: [VisualizarUbicacionesPage]
})
export class VisualizarUbicacionesPageModule {}