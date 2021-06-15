import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarUbicacionesPage } from './visualizar-ubicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarUbicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarUbicacionesPageRoutingModule {}
