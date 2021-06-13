import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaAdministradorPageRoutingModule } from './alta-administrador-routing.module';

import { AltaAdministradorPage } from './alta-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaAdministradorPageRoutingModule
  ],
  declarations: [AltaAdministradorPage]
})
export class AltaAdministradorPageModule {}
