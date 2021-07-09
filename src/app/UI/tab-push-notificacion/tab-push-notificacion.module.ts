import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPushNotificacionPageRoutingModule } from './tab-push-notificacion-routing.module';

import { TabPushNotificacionPage } from './tab-push-notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPushNotificacionPageRoutingModule
  ],
  declarations: [TabPushNotificacionPage]
})
export class TabPushNotificacionPageModule {}
