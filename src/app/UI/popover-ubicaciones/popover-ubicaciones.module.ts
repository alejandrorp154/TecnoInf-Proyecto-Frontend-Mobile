import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PopoverUbicacionesComponent } from "./popover-ubicaciones.component";
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    RouterModule],
  declarations: [PopoverUbicacionesComponent],
  exports: [PopoverUbicacionesComponent]
})
export class PopoverModule {}
