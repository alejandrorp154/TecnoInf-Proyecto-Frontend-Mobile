import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteresesUsuarioComunPageRoutingModule } from './intereses-usuario-comun-routing.module';

import { InteresesUsuarioComunPage } from './intereses-usuario-comun.page';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteresesUsuarioComunPageRoutingModule,
    NavbarModule
  ],
  declarations: [InteresesUsuarioComunPage]
})
export class InteresesUsuarioComunPageModule {}
