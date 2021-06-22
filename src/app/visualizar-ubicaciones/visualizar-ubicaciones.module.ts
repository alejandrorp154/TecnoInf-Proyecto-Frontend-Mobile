import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarUbicacionesPageRoutingModule } from './visualizar-ubicaciones-routing.module';

import { VisualizarUbicacionesPage } from './visualizar-ubicaciones.page';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { MapaModule } from '../UI/mapa/mapa.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PopoverUbicacionesComponent } from '../UI/popover-ubicaciones/popover-ubicaciones.component';
import { PopoverModule } from '../UI/popover-ubicaciones/popover-ubicaciones.module';

@NgModule({
  entryComponents: [
    PopoverUbicacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarUbicacionesPageRoutingModule,
    NavbarModule,
    MapaModule,
    PopoverModule
  ],
  declarations: [VisualizarUbicacionesPage],
  providers: [
    Geolocation
  ]
})
export class VisualizarUbicacionesPageModule {}
