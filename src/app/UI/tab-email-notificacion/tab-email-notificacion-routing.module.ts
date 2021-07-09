import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabEmailNotificacionPage } from './tab-email-notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: TabEmailNotificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabEmailNotificacionPageRoutingModule {}
