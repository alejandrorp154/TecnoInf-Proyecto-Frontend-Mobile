import { PanelDerechoPage } from './../UI/panel-derecho/panel-derecho.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { AltaPublicacionComponent } from '../UI/alta-publicacion/alta-publicacion.component';
import { BuscarMapaComponent } from '../UI/buscar-mapa/buscar-mapa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NavbarComponent, PanelDerechoPage, AltaPublicacionComponent, BuscarMapaComponent]
})
export class HomePageModule {}
