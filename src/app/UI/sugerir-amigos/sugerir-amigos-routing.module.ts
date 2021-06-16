import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerirAmigosPage } from './sugerir-amigos.page';

const routes: Routes = [
  {
    path: '',
    component: SugerirAmigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerirAmigosPageRoutingModule {}
