import { NavbarModule } from "./../UI/navbar/navbar.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPerfilPageRoutingModule } from './modificar-perfil-routing.module';

import { ModificarPerfilPage } from './modificar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPerfilPageRoutingModule,
    NavbarModule
  ],
  declarations: [ModificarPerfilPage]
})
export class ModificarPerfilPageModule {}
