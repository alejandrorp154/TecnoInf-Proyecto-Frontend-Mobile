import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionNotificacionesPage } from './configuracion-notificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionNotificacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionNotificacionesPageRoutingModule {}
