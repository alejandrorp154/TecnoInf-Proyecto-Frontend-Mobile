import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { AppModule } from '../app.module';
import { AltaPublicacionComponent } from '../UI/alta-publicacion/alta-publicacion.component';
import { BuscarMapaComponent } from '../UI/buscar-mapa/buscar-mapa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NavbarModule
  ],
  declarations: [HomePage, AltaPublicacionComponent, BuscarMapaComponent]
})
export class HomePageModule {}
