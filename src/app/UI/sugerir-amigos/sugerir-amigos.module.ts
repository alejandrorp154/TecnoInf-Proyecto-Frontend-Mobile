import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugerirAmigosPageRoutingModule } from './sugerir-amigos-routing.module';

import { SugerirAmigosPage } from './sugerir-amigos.page';

import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugerirAmigosPageRoutingModule,
    NavbarModule
  ],
  declarations: [SugerirAmigosPage]
})
export class SugerirAmigosPageModule {}
