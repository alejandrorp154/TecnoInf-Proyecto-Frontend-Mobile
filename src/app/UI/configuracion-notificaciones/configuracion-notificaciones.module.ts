import { TabPushNotificacionPageModule } from "./../tab-push-notificacion/tab-push-notificacion.module";
import { TabEmailNotificacionPageModule } from "./../tab-email-notificacion/tab-email-notificacion.module";
import { EstadisticasPageModule } from "./../../estadisticas/estadisticas.module";
import { NavbarModule } from "./../navbar/navbar.module";
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
    ConfiguracionNotificacionesPageRoutingModule,
    NavbarModule,
    TabEmailNotificacionPageModule,
    TabPushNotificacionPageModule
  ],
  declarations: [ConfiguracionNotificacionesPage]
})
export class ConfiguracionNotificacionesPageModule {}
