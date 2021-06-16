import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { MapaComponent } from "./mapa.component";
import { Geolocation as Geo } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule],
  declarations: [MapaComponent],
  exports: [MapaComponent],
  providers: [
    Geo
  ]
})
export class MapaModule {}
