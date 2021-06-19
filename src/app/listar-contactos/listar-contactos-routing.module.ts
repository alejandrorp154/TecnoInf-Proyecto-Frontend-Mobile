import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarContactosPage } from './listar-contactos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarContactosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarContactosPageRoutingModule {}
