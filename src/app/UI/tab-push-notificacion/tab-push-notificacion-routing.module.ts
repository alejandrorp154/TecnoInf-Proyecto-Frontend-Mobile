import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPushNotificacionPage } from './tab-push-notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: TabPushNotificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPushNotificacionPageRoutingModule {}
