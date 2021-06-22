import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { estadosContactos } from '../modelos/estadosContactos.enum';
import { Evento } from '../modelos/evento.model';
import { Usuario } from '../modelos/usuario.model';
import { AuthService } from '../servicios/auth.service';
import { EventoService } from '../servicios/evento.service';
import { Resultado, ToolsService } from '../servicios/tools.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  loggedUser: Usuario;
  eventos: Evento[];
  bsEventos: BehaviorSubject<Evento[]> = new BehaviorSubject([]);
  subscription: Subscription;

  constructor(private eventoService: EventoService, private usuarioService: UsuarioService, private authService: AuthService,
    private toolsService: ToolsService,private alertController: AlertController, private router: Router, private location: Location) {

      this.subscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log(event, event.urlAfterRedirects);
          if (event.urlAfterRedirects['url'] == '/eventos')
            this.ngOnInit();
        }
      });

      this.bsEventos.next([]);
      this.eventos = [];
  }

  async ngOnInit() {
    console.log('entró');
    let userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log(userFire);
    //this.loggedUser = await this.usuarioService.getUsuario(userFire.id);
    this.eventos = await this.eventoService.obtenerEventosXPersona(userFire.id);
    this.eventos.forEach(e => {e.fechaInicio = new Date(e.fechaInicio); e.fechaFin = new Date(e.fechaFin)});
    console.log(this.eventos);
    this.eventos.sort((a,b) => a.fechaInicio.getTime() - b.fechaInicio.getTime());
    this.bsEventos.next(this.eventos);
    console.log(this.eventos);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  editar(evento: Evento) {
    this.eventoService.eventoActual = evento;
    this.router.navigateByUrl('/evento/editar/' + evento.idEvento);
  }

  ver(evento: Evento) {
    this.eventoService.eventoActual = evento;
    this.router.navigateByUrl('/evento/' + evento.idEvento);
  }

  prueba() {
    console.log(this.location.getState());
  }


  async eliminar(idEvento: number) {
    await this.eventoService.elminarEvento(idEvento).then(res => {
      console.log(res);
      console.log(this.eventos.findIndex(e => e.idEvento == idEvento));
      console.log(this.eventos);
      this.eventos.splice(this.eventos.findIndex(e => e.idEvento == idEvento));
      console.log(this.eventos);
      this.bsEventos.next(this.eventos);
      this.toolsService.presentToast('El evento se eliminó correctamente', Resultado.Ok);
    }).catch(error => {
      this.toolsService.presentToast('Surgió un error al eliminar el evento', Resultado.Error);
    });
  }

}
