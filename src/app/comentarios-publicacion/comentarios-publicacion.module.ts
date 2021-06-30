import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosPublicacionPageRoutingModule } from './comentarios-publicacion-routing.module';

import { ComentariosPublicacionPage } from './comentarios-publicacion.page';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosPublicacionPageRoutingModule,
    NavbarModule,
    ReactiveFormsModule
  ],
  declarations: [ComentariosPublicacionPage]
})
export class ComentariosPublicacionPageModule {}
