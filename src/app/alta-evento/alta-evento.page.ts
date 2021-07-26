import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Evento, Invitado } from '../modelos/evento.model';
import { Preview } from '../modelos/preview';
import { Ubicacion } from '../modelos/ubicacion.model';
import { EventoService } from '../servicios/evento.service';
import { Resultado, ToolsService } from '../servicios/tools.service';
import { Usuario } from '../modelos/usuario.model';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../servicios/auth.service';
import { PublicacionPerfilUsuario } from '../modelos/perfil';

@Component({
  selector: 'app-alta-evento',
  templateUrl: './alta-evento.page.html',
  styleUrls: ['./alta-evento.page.scss'],
})

export class AltaEventoPage implements OnInit {

  evento: Evento;

  inicio: String = new Date().toISOString();
  fin: String = new Date().toISOString();
  today: Date;
  ubicacion: BehaviorSubject<Ubicacion> = new BehaviorSubject(new Ubicacion());
  participantes: BehaviorSubject<Invitado[]> = new BehaviorSubject([]);
  invitados: Invitado[];
  latitud: number;
  longitud: number;
  editando: boolean;
  creando: boolean;
  currentUser: Usuario;
  tipo: string = 'texto';
  preview: Preview = new Preview();

  activeTab: string;
  searching: boolean;
  searchBar = new FormControl;

  friends: Usuario[];
  searchResult: BehaviorSubject<any[]> = new BehaviorSubject([]);

  imageSource;
  imagen = {
    base64: '',
    nombre: '',
    ext: ''
  }

  publicacionesAux: PublicacionPerfilUsuario[];
  publicaciones: PublicacionPerfilUsuario[];
  size: number = 10;

  constructor(private eventoService: EventoService, private usuarioService: UsuarioService, private toolsService: ToolsService,
    private authService: AuthService,
    private sanitizer: DomSanitizer, private _Activatedroute: ActivatedRoute, private location: Location) {
      this.evento = new Evento();
      this.evento.descripcion = '';
      this.evento.nombre = '';
      this.latitud = -34.8833;
      this.longitud = -58.1667;
      this.activeTab = 'publicaciones';
      this.invitados = [];
   }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser().toPromise();
    console.log(this._Activatedroute.snapshot['_routerState'].url);
    this.editando = this._Activatedroute.snapshot['_routerState'].url.toString().includes('/evento/editar');
    this.creando = this._Activatedroute.snapshot['_routerState'].url == '/evento/alta';
    console.log(this.editando);
    if(!this.creando) {
      let idEvento: number;
      try {
        this._Activatedroute.paramMap.subscribe(params => {
          idEvento = parseInt(params.get('idEvento'));
        });

        this.evento = await this.eventoService.obtenerEvento(idEvento);
        this.publicaciones = await this.eventoService.obtenerPublicaciones(this.evento.idEvento.toString(),this.size);
        this.evento.owner = this.evento.idPersona == this.currentUser.idPersona;

        this.evento.invitados.forEach(ii => this.invitados.push(Object.assign({}, ii)));
        //this.invitados = Object.assign(this.evento.invitados);
        this.participantes.next(this.evento.owner ? this.evento.invitados : this.evento.invitados.filter(i => i.estadoContactos == 'aceptada'));
        console.log(this.evento);
        this.latitud = this.evento.ubicacion.latitud;
        this.longitud = this.evento.ubicacion.longitud;
        this.ubicacion.next(this.evento.ubicacion);
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.evento.imagen);
        this.evento.fechaInicio = new Date(this.evento.fechaInicio);
        this.evento.fechaFin = new Date(this.evento.fechaFin);
        this.inicio = this.evento.fechaInicio.toISOString();
        this.fin = this.evento.fechaFin.toISOString();
      } catch(err) {
        this.toolsService.presentToast('Surgió un error obteniendo el evento.', Resultado.Error);
        console.log(err);
        //this.goBack();
      }

    }

    if (this.creando || this.editando) {
      this.friends = await this.usuarioService.getAmigosAsync(this.currentUser.idPersona);

      this.searchBar.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value.toString()))
      ).subscribe(res => this.searchResult.next(res));

    }

    console.log(this.evento);

    this.today = new Date();
    console.log(this.today);

  }


  agregarInvitado(inv: Usuario) {
    console.log(inv);
    console.log(this.evento.owner);
    this.invitados.push({
      idPersona: inv.idPersona,
      nickname: inv.nickname,
      nombre: inv.nombre,
      apellido: inv.apellido,
      imagenPerfil: inv.imagenPerfil,
      nombreImagen: inv.nombreImagen,
      extensionImagen: inv.extension,
      estadoContactos: 'pendiente',
      owner: this.currentUser.idPersona == inv.idPersona
    });
    this.participantes.next(this.invitados);
    this.searchBar.setValue('');

  }

  removerInvitado(inv: Usuario) {
    this.invitados.splice(this.invitados.findIndex(i => i.idPersona == inv.idPersona), 1);
    this.participantes.next(this.evento.owner ? this.invitados : this.invitados.filter(i => i.estadoContactos == 'aceptada'));
  }

  marcarUbicacion(ubicacion: Ubicacion) {
    console.log(ubicacion, ' (altaEvento)');
    console.log(new Date(this.inicio.toString()) > new Date(this.fin.toString()));

    this.evento.ubicacion = ubicacion;
    this.evento.ubicacion.descripcion = '';
    this.evento.ubicacion.fecha = new Date();
    this.evento.ubicacion.pais = '';
    this.evento.ubicacion.idPersona = '';
    //this.evento.ubicacion.idUbicacion = 0;
    console.log(this.isValid(), this.evento);
  }

  setMinFin(event) {
    this.fin = event.detail.value;
    console.log(event.detail);
  }

  async submit() {

    console.log('Submit!');
    console.log(this.latitud, this.longitud);

    //evento.idEvento = 0;

    if (!this.editando) {
      this.evento.fechaInicio = new Date(this.inicio.toString());
      this.evento.fechaFin = new Date(this.fin.toString());
      this.evento.idPersona = '';
      this.evento.idChat = '';
      this.evento.estado = 1;
      this.evento.invitados = Object.assign(this.invitados);
      await this.eventoService.crearEvento(this.evento).then(res => {
        this.evento.idEvento = res.idEvento;
        this.evento.idChat = res.idChat;
        this.evento.idPersona = res.idPersona;
        this.toolsService.presentToast('El evento se ingresó correctamente', Resultado.Ok);
      }).catch(error => {
        this.toolsService.presentToast('Surgió un error al crear el evento', Resultado.Error);
      });
    } else {
      console.log(this.evento);
      console.log(this.invitados.map(i => i.idPersona));
      await this.eventoService.modificarEvento(this.evento, this.invitados.map(i => i.idPersona)).then(res => {
        this.toolsService.presentToast('El evento se modificó correctamente', Resultado.Ok);
      }).catch(error => {
        this.toolsService.presentToast('Surgió un error al modificar el evento', Resultado.Error);
      });
    }
    this.goBack();
  }

  private _filter(value: string): Usuario[] {
    console.log(this.friends);
    if(value) {
      this.searching = true;
      const filterValue = value.toLocaleLowerCase();

      return this.friends.filter(amigo => {
        if(amigo.apellido) {
          return (amigo.nombre.toLocaleLowerCase().includes(filterValue) || amigo.apellido.toLocaleLowerCase().includes(filterValue));
        } else {
          return amigo.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        }
      });
    } else {
      this.searching = false;
    }
  }

  uploadFile(event) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.tipo = 'foto';
      const img: string | ArrayBuffer = reader.result as string;
      this.evento.imagen = img;
      this.evento.nombreImagen = file.name;
      this.evento.extension = file.type;
      let base64 = [];
      base64 = img.split(',');
     this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${base64[0]}, ${base64[1]}`);
     console.log(this.imageSource);
    };
  }

  toggleTab(tabName: string) {
    this.activeTab = tabName;
  }

  isValid(): boolean {
    return this.inicio && this.fin && this.evento.ubicacion && this.evento.nombre != '' && this.evento.descripcion != '';
  }

  goBack() {
    this.location.back();
  }

  removerIntegrante(participante: Invitado)
  {
    this.eventoService.removerParticipante(participante.idPersona, this.evento.idEvento, this.evento.idChat)
    let index = this.participantes.value.findIndex(x => x.idPersona == participante.idPersona)
    if (index > -1) {
      this.participantes.value.splice(index, 1);
    }
  }

  async loadData(event?) {

    this.publicacionesAux = await this.eventoService.obtenerPublicaciones(this.evento.idEvento.toString(), this.size, event);
    this.publicacionesAux.forEach(element => {
      this.publicaciones.push(element)
    });

  }

}

