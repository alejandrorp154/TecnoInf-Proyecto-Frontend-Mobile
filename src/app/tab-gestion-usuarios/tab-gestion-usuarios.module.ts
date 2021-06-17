import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabGestionUsuariosPageRoutingModule } from './tab-gestion-usuarios-routing.module';

import { TabGestionUsuariosPage } from './tab-gestion-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabGestionUsuariosPageRoutingModule
  ],
  declarations: [TabGestionUsuariosPage]
})
export class TabGestionUsuariosPageModule {}
