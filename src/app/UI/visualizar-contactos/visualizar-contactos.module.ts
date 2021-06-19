import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarContactosPageRoutingModule } from './visualizar-contactos-routing.module';

import { VisualizarContactosPage } from './visualizar-contactos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarContactosPageRoutingModule
  ],
  declarations: [VisualizarContactosPage]
})
export class VisualizarContactosPageModule {}
