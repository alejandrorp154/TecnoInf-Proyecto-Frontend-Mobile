import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionNotificacionesPageRoutingModule } from './configuracion-notificaciones-routing.module';

import { ConfiguracionNotificacionesPage } from './configuracion-notificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionNotificacionesPageRoutingModule
  ],
  declarations: [ConfiguracionNotificacionesPage]
})
export class ConfiguracionNotificacionesPageModule {}
