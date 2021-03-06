import { AltaAdministradorPageModule } from "./../alta-administrador/alta-administrador.module";
import { InteresPageModule } from "./../interes/interes.module";
import { TabGestionUsuariosPageModule } from "./../tab-gestion-usuarios/tab-gestion-usuarios.module";
import { TabMedallasPageModule } from "./../tab-medallas/tab-medallas.module";
import { EstadisticasPageModule } from "./../estadisticas/estadisticas.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPagePageRoutingModule } from './admin-page-routing.module';

import { AdminPagePage } from './admin-page.page';
import { NavbarComponent } from "../UI/navbar/navbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    EstadisticasPageModule,
    TabMedallasPageModule,
    TabGestionUsuariosPageModule,
    InteresPageModule,
    AltaAdministradorPageModule
  ],
  declarations: [AdminPagePage]
})
export class AdminPagePageModule {}
