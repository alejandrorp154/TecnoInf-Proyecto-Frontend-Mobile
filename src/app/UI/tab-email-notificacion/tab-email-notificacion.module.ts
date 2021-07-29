import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from "./../navbar/navbar.module";
import { IonicModule } from '@ionic/angular';

import { TabEmailNotificacionPageRoutingModule } from './tab-email-notificacion-routing.module';

import { TabEmailNotificacionPage } from './tab-email-notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabEmailNotificacionPageRoutingModule,
    NavbarModule
  ],
  declarations: [TabEmailNotificacionPage]
})
export class TabEmailNotificacionPageModule {}
