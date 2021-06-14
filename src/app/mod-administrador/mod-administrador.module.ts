import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModAdministradorPageRoutingModule } from './mod-administrador-routing.module';

import { ModAdministradorPage } from './mod-administrador.page';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModAdministradorPageRoutingModule,
    NavbarModule
  ],
  declarations: [ModAdministradorPage]
})
export class ModAdministradorPageModule {}
