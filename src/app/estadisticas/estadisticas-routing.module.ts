import { NavbarComponent } from '../UI/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadisticasPage } from './estadisticas.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticasPageRoutingModule {}
