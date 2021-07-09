import { TabPushNotificacionPageModule } from "./../tab-push-notificacion/tab-push-notificacion.module";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionNotificacionesPage } from './configuracion-notificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionNotificacionesPage,
    children: [
      {
        path: 'emailNotifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../../UI/tab-email-notificacion/tab-email-notificacion.module').then(a => a.TabEmailNotificacionPageModule)
          }
        ]
      },
      {
        path: 'pushNotifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../../UI/tab-push-notificacion/tab-push-notificacion.module').then(a => a.TabPushNotificacionPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/configuracion-notificaciones/emailNotifications',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionNotificacionesPageRoutingModule {}
