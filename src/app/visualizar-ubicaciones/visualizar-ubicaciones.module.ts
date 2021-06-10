import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarUbicacionesPageRoutingModule } from './visualizar-ubicaciones-routing.module';

import { VisualizarUbicacionesPage } from './visualizar-ubicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarUbicacionesPageRoutingModule
  ],
  declarations: [VisualizarUbicacionesPage]
})
export class VisualizarUbicacionesPageModule {}
