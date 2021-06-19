import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarContactosPage } from './visualizar-contactos.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarContactosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarContactosPageRoutingModule {}
