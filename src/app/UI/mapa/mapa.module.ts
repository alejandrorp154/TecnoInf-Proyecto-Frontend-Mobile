import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { MapaComponent } from "./mapa.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule],
  declarations: [MapaComponent],
  exports: [MapaComponent]
})
export class MapaModule {}
