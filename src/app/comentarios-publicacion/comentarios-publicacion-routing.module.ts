import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentariosPublicacionPage } from './comentarios-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ComentariosPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentariosPublicacionPageRoutingModule {}
