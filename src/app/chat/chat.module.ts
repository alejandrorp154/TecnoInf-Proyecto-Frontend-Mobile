import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { NavbarComponent } from '../UI/navbar/navbar.component';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { NavbarModule } from '../UI/navbar/navbar.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    NavbarModule
  ],
  declarations: [ChatPage,  FormatFileSizePipe]
})
export class ChatPageModule {}
