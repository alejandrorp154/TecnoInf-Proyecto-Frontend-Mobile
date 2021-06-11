import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Evento } from '../modelos/evento.model';
import { Persona } from '../modelos/persona.model';
import { EventoService } from '../servicios/evento.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  loggedUser: Persona;
  eventos: Evento[];

  constructor(private eventoService: EventoService, private usuarioService: UsuarioService, private alertController: AlertController) {
    this.eventos = [];
  }

  async ngOnInit() {
    this.loggedUser = await this.usuarioService.getLoggedUser();
    this.eventos = await this.eventoService.obtenerEventosXPersona(this.loggedUser.idPersona);
    console.log(this.eventos);
  }

  eliminarAlert(evento: Evento) {
    this.alertController
      .create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que deseas eliminar este evento?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Borrar',
            handler: () => {
              this.eliminar(evento.idEvento);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  eliminar(idEvento: number) {
    this.eventoService.elminarEvento(idEvento);
  }

}