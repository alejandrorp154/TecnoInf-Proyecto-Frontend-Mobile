import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { FeedComponent } from '../UI/feed/feed.component';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    NavbarModule
  ],
  declarations: [PerfilPage, FeedComponent]
})
export class PerfilPageModule {}
