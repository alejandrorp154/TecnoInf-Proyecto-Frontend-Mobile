import { Usuario } from "./../../modelos/usuario.model";
import { IonItemSliding } from "@ionic/angular";
import { Contacto } from "./../../modelos/contacto.model";
import { Persona } from "./../../modelos/persona.model";
import { UserFire } from "./../../modelos/userFire.model";
import { UsuarioService } from "./../../servicios/usuario.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-contactos',
  templateUrl: './visualizar-contactos.page.html',
  styleUrls: ['./visualizar-contactos.page.scss'],
})
export class VisualizarContactosPage implements OnInit {

  LoggedUser: Persona;

  contactos: Contacto[];
  contactosPersona: Persona[];

  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
    let PPersona = this.usuarioService.getLoggedUser();

    await Promise.all([PPersona]).then((values) => {
      console.log(values);
      this.LoggedUser = values[0];
    });
  }

  ionViewDidEnter(){
   this.getContactos();
   this.contactosPersona = this.getContactosPersona();
  }

  async getContactos(){
    this.contactos = await this.usuarioService.getContactosAsync(this.LoggedUser.idPersona)
  }

  getContactosPersona(){
    let t= this;
    let lista: Persona[] = [];
    this.contactos.forEach(function(contacto){
      let persona = t.usuarioService.getUsuario(contacto.idPersona);
      lista.push(persona);
    })
    return lista;
  }

  onEliminarContacto(idPersonaABorrar: string, slidingUser: IonItemSliding){
    this.usuarioService.bajaContacto(this.LoggedUser.idPersona, idPersonaABorrar);
    slidingUser.close();
  }

}
