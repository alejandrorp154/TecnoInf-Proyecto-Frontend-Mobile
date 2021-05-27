import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelDerechoPage } from './panel-derecho.page';

const routes: Routes = [
  {
    path: '',
    component: PanelDerechoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelDerechoPageRoutingModule {}
