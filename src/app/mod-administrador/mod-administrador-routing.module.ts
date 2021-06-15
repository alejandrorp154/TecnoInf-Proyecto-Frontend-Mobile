import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModAdministradorPage } from './mod-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: ModAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModAdministradorPageRoutingModule {}
