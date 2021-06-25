import { NavbarModule } from "./../navbar/navbar.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudesPendientesPageRoutingModule } from './solicitudes-pendientes-routing.module';

import { SolicitudesPendientesPage } from './solicitudes-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudesPendientesPageRoutingModule,
    NavbarModule
  ],
  declarations: [SolicitudesPendientesPage]
})
export class SolicitudesPendientesPageModule {}
