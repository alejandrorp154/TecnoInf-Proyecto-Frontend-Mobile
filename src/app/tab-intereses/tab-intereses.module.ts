import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabInteresesPageRoutingModule } from './tab-intereses-routing.module';

import { TabInteresesPage } from './tab-intereses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabInteresesPageRoutingModule
  ],
  declarations: [TabInteresesPage]
})
export class TabInteresesPageModule {}
