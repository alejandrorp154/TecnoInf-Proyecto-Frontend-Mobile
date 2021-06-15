import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabGestionUsuariosPage } from './tab-gestion-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: TabGestionUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabGestionUsuariosPageRoutingModule {}
