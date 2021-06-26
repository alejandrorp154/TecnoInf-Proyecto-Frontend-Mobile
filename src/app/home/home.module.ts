import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavbarModule } from '../UI/navbar/navbar.module';
import { AppModule } from '../app.module';
import { AltaPublicacionComponent } from '../UI/alta-publicacion/alta-publicacion.component';
import { BuscarMapaComponent } from '../UI/buscar-mapa/buscar-mapa.component';
import { FeedHomeComponent } from '../UI/feed-home/feed-home.component';
import { PubEeComponent } from '../UI/feed-home/pub-ee/pub-ee.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    NavbarModule
  ],
  declarations: [HomePage, AltaPublicacionComponent, BuscarMapaComponent, FeedHomeComponent, PubEeComponent]
})
export class HomePageModule {}
