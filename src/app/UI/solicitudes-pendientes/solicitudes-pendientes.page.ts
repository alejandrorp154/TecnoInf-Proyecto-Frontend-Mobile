import { Usuario } from "src/app/modelos/usuario.model";
import { UserFire } from "./../../modelos/userFire.model";
import { AuthService } from "src/app/servicios/auth.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Component, OnInit } from '@angular/core';
import { EstadosContactos } from "src/app/modelos/contacto.model";

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.page.html',
  styleUrls: ['./solicitudes-pendientes.page.scss'],
})
export class SolicitudesPendientesPage implements OnInit {

  userFire: Usuario;
  solicitudes: Usuario[];
  showError: boolean;
  errorMessage: string;

  constructor(private userService: UsuarioService, private authService: AuthService)
  {
    this.showError = false;
  }

  async ngOnInit() {
    this.userFire = await this.authService.getCurrentUser().toPromise();
    console.log(this.userFire.idPersona);
    this.getSolicitudesPendientes(this.userFire.idPersona);
    console.log(this.solicitudes);
  }

  async getSolicitudesPendientes(id: string){
    this.solicitudes = await this.userService.getSolicitudesPendientes(id);
  }

  onAceptar(idPersona: string){
    this.userService.respuestaContacto(this.userFire.idPersona, idPersona, EstadosContactos.aceptada);
    async () => {
      await this.getSolicitudesPendientes(this.userFire.idPersona);
    }
  }

  onRechazar(idPersona: string){
    this.userService.respuestaContacto(this.userFire.idPersona, idPersona, EstadosContactos.cancelada);
    async () => {
      await this.getSolicitudesPendientes(this.userFire.idPersona);
    }
  }



}
