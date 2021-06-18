import { MedallaComponent } from "./../UI/medalla/medalla.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPagePage } from './admin-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPagePage,
    children: [
      {
        path: 'estadisticas',
        children: [
          {
            path: '',
            loadChildren: () => import('../estadisticas/estadisticas.module').then(a => a.EstadisticasPageModule)
          }
        ]
      },
      {
        path: 'tabIntereses',
        children: [
          {
            path: '',
            // loadChildren: () => import('../tab-intereses/tab-intereses.module').then(a => a.TabInteresesPageModule)
            loadChildren: () => import('../interes/interes.module').then(a => a.InteresPageModule)
          }
        ]
      },
      {
        path: 'tabMedallas',
        children: [
          {
            path: '',
            //loadChildren: () => import('../UI/medalla/medalla.component').then(a => a.MedallaComponent),
            // component: MedallaComponent
          }
        ]
      },
      {
        path: 'tabGestionUsuarios',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab-gestion-usuarios/tab-gestion-usuarios.module').then(a => a.TabGestionUsuariosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/admin-page/estadisticas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin-page/estadisticas/estadisticas',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagePageRoutingModule {}
