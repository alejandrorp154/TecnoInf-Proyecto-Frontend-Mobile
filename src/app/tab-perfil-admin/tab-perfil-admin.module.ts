import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPerfilAdminPageRoutingModule } from './tab-perfil-admin-routing.module';

import { TabPerfilAdminPage } from './tab-perfil-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPerfilAdminPageRoutingModule
  ],
  declarations: [TabPerfilAdminPage]
})
export class TabPerfilAdminPageModule {}
