import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentariosPublicacionPageRoutingModule } from './comentarios-publicacion-routing.module';

import { ComentariosPublicacionPage } from './comentarios-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentariosPublicacionPageRoutingModule
  ],
  declarations: [ComentariosPublicacionPage]
})
export class ComentariosPublicacionPageModule {}
