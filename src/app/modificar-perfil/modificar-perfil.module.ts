import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarPerfilPageRoutingModule } from './modificar-perfil-routing.module';

import { ModificarPerfilPage } from './modificar-perfil.page';
import { NavbarComponent } from '../UI/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarPerfilPageRoutingModule
  ],
  declarations: [ModificarPerfilPage, NavbarComponent]
})
export class ModificarPerfilPageModule {}
