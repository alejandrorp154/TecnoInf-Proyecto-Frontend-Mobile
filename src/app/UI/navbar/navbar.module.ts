import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule {}
