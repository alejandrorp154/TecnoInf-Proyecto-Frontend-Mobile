import { ConfiguracionesService } from "./../../servicios/configuraciones.service";
import { Component, OnInit } from '@angular/core';
import { Configuracion } from "src/app/modelos/configuracion.model";

@Component({
  selector: 'app-configuracion-notificaciones',
  templateUrl: './configuracion-notificaciones.page.html',
  styleUrls: ['./configuracion-notificaciones.page.scss'],
})
export class ConfiguracionNotificacionesPage implements OnInit {

  constructor(private configuracionService: ConfiguracionesService) { }

  configuraciones: Configuracion[]

  async ngOnInit() {
    await this.getConfiguraciones()
  }

  async getConfiguraciones(){
    this.configuraciones = await this.configuracionService.getConfiguraciones();
  }

}
