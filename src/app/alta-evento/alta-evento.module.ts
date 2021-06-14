import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaEventoPageRoutingModule } from './alta-evento-routing.module';

import { MapaComponent } from '../UI/mapa/mapa.component';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { AltaEventoPage } from './alta-evento.page';
//import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaEventoPageRoutingModule
  ],
  declarations: [AltaEventoPage, MapaComponent, NavbarComponent],
  providers: [
    //Geolocation
  ]
})
export class AltaEventoPageModule {}
