import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPagePage } from './admin-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagePageRoutingModule {}
