import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListarContactosPageRoutingModule } from './listar-contactos-routing.module';

import { ListarContactosPage } from './listar-contactos.page';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarContactosPageRoutingModule,
    NavbarModule
  ],
  declarations: [ListarContactosPage]
})
export class ListarContactosPageModule {}
