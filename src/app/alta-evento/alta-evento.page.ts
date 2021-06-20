import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../modelos/evento.model';
import { Preview } from '../modelos/preview';
import { Ubicacion } from '../modelos/ubicacion.model';
import { EventoService } from '../servicios/evento.service';
import { Resultado, ToolsService } from '../servicios/tools.service';

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
  ubicacion: any;
  latitud: number;
  longitud: number;
  editando: boolean;
  visualizando: boolean;

  tipo: string = 'texto';
  preview: Preview = new Preview();

  imageSource;
  imagen = {
    base64: '',
    nombre: '',
    ext: ''
  }

  constructor(private eventoService: EventoService, private toolsService: ToolsService, private sanitizer: DomSanitizer,
    private _Activatedroute: ActivatedRoute, private location: Location) {
      this.evento = new Evento();
      this.evento.descripcion = '';
      this.evento.nombre = '';
      this.latitud = -34.8833;
      this.longitud = -58.1667;
   }

  ngOnInit() {

    console.log(this._Activatedroute.snapshot['_routerState'].url);
    this.editando = this._Activatedroute.snapshot['_routerState'].url == '/editar-evento';
    this.visualizando = this._Activatedroute.snapshot['_routerState'].url == '/evento';

    if (this.editando || this.visualizando) {
      if (this.eventoService.eventoActual) {
        this.evento = this.eventoService.eventoActual;
        this.latitud = this.evento.ubicacion.latitud;
        this.longitud = this.evento.ubicacion.longitud;
        this.ubicacion = this.evento.ubicacion;
        this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.evento.imagen);
        this.inicio = this.evento.fechaInicio.toISOString();
        this.fin = this.evento.fechaFin.toISOString();
        console.log(this.ubicacion);
        console.log(this.visualizando, this.evento);
      } else {
        this.toolsService.presentToast('Surgió un error obteniendo el evento.', Resultado.Error);
        this.goBack();
      }
    }

    this.today = new Date();
    console.log(this.today);
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
    this.evento.fechaInicio = new Date(this.inicio.toString());
    this.evento.fechaFin = new Date(this.fin.toString());
    this.evento.idPersona = '';
    this.evento.idChat = '';
    this.evento.estado = 1;
    //evento.idEvento = 0;

    if (!this.editando) {
      await this.eventoService.crearEvento(this.evento).then(res => {
        this.evento.idEvento = res.idEvento;
        this.evento.idChat = res.idChat;
        this.evento.idPersona = res.idPersona;
        this.toolsService.presentToast('El evento se ingresó correctamente', Resultado.Ok);
      }).catch(error => {
        this.toolsService.presentToast('Surgió un error al crear el evento', Resultado.Error);
      });
    } else {
      await this.eventoService.modificarEvento(this.evento).then(res => {
        this.toolsService.presentToast('El evento se modificó correctamente', Resultado.Ok);
      }).catch(error => {
        this.toolsService.presentToast('Surgió un error al modificar el evento', Resultado.Error);
      });
    }
    this.goBack();
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

  isValid(): boolean {
    return this.inicio && this.fin && this.evento.ubicacion && this.evento.nombre != '' && this.evento.descripcion != '';
  }

  goBack() {
    this.location.back();
  }

}

