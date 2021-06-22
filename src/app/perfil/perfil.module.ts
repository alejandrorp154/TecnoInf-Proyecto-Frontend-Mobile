import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { FeedComponent } from '../UI/feed/feed.component';
import { CommonModule } from '@angular/common';
import { PubMapaEEComponent } from '../UI/feed/pub-mapa-ee/pub-mapa-ee.component';
import { MedallaComponent } from '../UI/medalla/medalla.component';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { PopoverPublicacionesComponent } from '../UI/popover-publicaciones/popover-publicaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    NavbarModule
  ],
  declarations: [PerfilPage, FeedComponent, PubMapaEEComponent, MedallaComponent, PopoverPublicacionesComponent]
})
export class PerfilPageModule {}
