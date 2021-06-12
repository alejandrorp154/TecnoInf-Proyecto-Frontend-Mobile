import { NavbarComponent } from '../UI/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './estadisticas-routing.module';

import { EstadisticasPage } from './estadisticas.page';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasPageRoutingModule,
    NavbarModule
  ],
  declarations: [EstadisticasPage]
})
export class EstadisticasPageModule {}
