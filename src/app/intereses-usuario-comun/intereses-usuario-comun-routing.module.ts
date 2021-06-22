import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteresesUsuarioComunPage } from './intereses-usuario-comun.page';

const routes: Routes = [
  {
    path: '',
    component: InteresesUsuarioComunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InteresesUsuarioComunPageRoutingModule {}
