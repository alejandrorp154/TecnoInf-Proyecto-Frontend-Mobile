import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPerfilAdminPage } from './tab-perfil-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabPerfilAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPerfilAdminPageRoutingModule {}
