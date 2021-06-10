import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteresPageRoutingModule } from './interes-routing.module';

import { InteresPage } from './interes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteresPageRoutingModule
  ],
  declarations: [InteresPage]
})
export class InteresPageModule {}
