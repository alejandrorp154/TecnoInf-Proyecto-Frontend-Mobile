import { UsuarioService } from "src/app/servicios/usuario.service";
import { Component, ElementRef, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Preview } from 'src/app/modelos/preview';
import { LinkPrevService } from 'src/app/servicios/link-prev.service';
import { BuscarMapaComponent } from '../buscar-mapa/buscar-mapa.component';
import { PubicacionService } from 'src/app/servicios/pubicacion.service';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Evento, idPersona, Publicacion, TipoPublicacion, TipoPublicacionEnum, usuario } from 'src/app/modelos/publicacion.model';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { DomSanitizer } from '@angular/platform-browser';
import { UbicacionService } from 'src/app/servicios/ubicacion.service';

import { DatePipe } from '@angular/common';
import { Ubicacion } from 'src/app/modelos/ubicacion.model';
import { Multimedia } from "src/app/modelos/multimedia.model";
import { Resultado, ToolsService } from "src/app/servicios/tools.service";
import { ActivatedRoute } from "@angular/router";
import { EventEmitter } from "@angular/core";
import { PublicacionPerfilUsuario } from "src/app/modelos/perfil";
import { MapaComponent } from "../mapa/mapa.component";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'app-alta-publicacion',
  templateUrl: './alta-publicacion.component.html',
  styleUrls: ['./alta-publicacion.component.scss'],
})
export class AltaPublicacionComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Input() evento: boolean;
  @Output() myEvent = new EventEmitter();

  constructor(private alertController: AlertController, private linkPrevService: LinkPrevService,
     public modalController: ModalController, private pubService: PubicacionService,
     private plt: Platform, private actionSheetCtrl: ActionSheetController,
     private sanitizer: DomSanitizer, private ubiService: UbicacionService,
     private datePipe: DatePipe, private userService: UsuarioService,
     private tools: ToolsService, private _Activatedroute: ActivatedRoute ) { }

  preview: Preview = new Preview;

  imageResponse: any;
  options: any;

  tipo: string = 'texto';

  publicacion: Publicacion;

  ubicacion: Ubicacion;

  mapa: Mapboxgl.map;

  imageSource;
  imagen = {
    base64: '',
    nombre: '',
    ext: ''
  }

  datoUsuario = {
    email: '',
    token: '',
    tokenExpirationDate: '',
    userId: ''
  }

  // resultado: Resultado;

  public usr: usuario;
  public idPer: idPersona;
  public tipoPub: TipoPublicacion;
  public eventoId: Evento;
  texto = {textoPub: ''}

  cord: string;
  lat: number;
  long: number;
  pais: string;

  ngOnInit() {
    this.datoUsuario = JSON.parse(localStorage.getItem('_cap_authData'));
  }

  nuevaPub(publicacion: PublicacionPerfilUsuario){
    this.myEvent.emit(publicacion);
  }

  async publicar(){
    this.usr = new usuario();
    this.idPer = new idPersona();
    this.tipoPub = new TipoPublicacion();
    this.eventoId = new Evento();
    this.idPer.idPersona = this.datoUsuario.userId; //Usuario logeado
    this.usr.usuario = this.idPer;
    this.tipoPub.tipo = this.obtenerTipo();
    if(this.tipo=='texto'){
      this.tipoPub.tipo = TipoPublicacionEnum.texto;
      if (this.evento) {
        this._Activatedroute.paramMap.subscribe(params => {
          this.eventoId.idEvento = parseInt(params.get('idEvento'));
        });
        this.publicacion = new Publicacion(this.tipoPub,this.texto.textoPub,'','',this.usr,this.eventoId);
      } else {
        this.publicacion = new Publicacion(this.tipoPub,this.texto.textoPub,'','',this.usr);
      }      
      this.texto.textoPub = '';
      var pub: any;
      pub = await this.pubService.altaPublicacion(this.publicacion);
      this.tools.presentToast('La publicacion fue creada con exito', Resultado.Ok);
      // console.log(pub);
      this.cancelar();
      this.nuevaPub(pub);
    }
    else if(this.tipo=='enlaceExterno'){
      this.tipoPub.tipo = TipoPublicacionEnum.enlaceExterno;
      var prev = this.preview.title+'|*|'+this.preview.description+'|*|'+this.preview.image+'|*|'+this.preview.url;
      console.log(this.tipoPub);
      if (this.evento) {
        this._Activatedroute.paramMap.subscribe(params => {
          this.eventoId.idEvento = parseInt(params.get('idEvento'));
        });
        this.publicacion = new Publicacion(this.tipoPub,prev,'','',this.usr,this.eventoId);
      } else {
        this.publicacion = new Publicacion(this.tipoPub,prev,'','',this.usr);
      }
      // console.log(this.publicacion);
      this.cancelar();
      var pub: any;
      pub = await this.pubService.altaPublicacion(this.publicacion);
      this.tools.presentToast('La publicacion fue creada con exito', Resultado.Ok);
      this.nuevaPub(pub);
    }
    else if(this.tipo=='foto'){
      // console.log(this.imagen);
      this.tipoPub.tipo = TipoPublicacionEnum.foto;
      if (this.evento) {
        this._Activatedroute.paramMap.subscribe(params => {
          this.eventoId.idEvento = parseInt(params.get('idEvento'));
        });
        this.publicacion = new Publicacion(this.tipoPub,this.imagen.base64,this.imagen.nombre,this.imagen.ext,this.usr,this.eventoId);
      } else {
        this.publicacion = new Publicacion(this.tipoPub,this.imagen.base64,this.imagen.nombre,this.imagen.ext,this.usr);
      }
      // console.log(this.publicacion);
      this.cancelar();
      var pub: any;
      pub = await this.pubService.altaPublicacion(this.publicacion);
      this.userService.subirFoto(new Multimedia(this.imagen.base64, this.imagen.nombre, this.imagen.ext, this.idPer.idPersona))
      this.tools.presentToast('La publicacion fue creada con exito', Resultado.Ok);
      this.nuevaPub(pub);
    }
    else{
      this.tipoPub.tipo = TipoPublicacionEnum.mapa;
      this.publicacion = new Publicacion(this.tipoPub,this.cord,'','',this.usr);
      this.pubService.altaPublicacion(this.publicacion);
      //Alta Ubicacion
      this.ubicacion = new Ubicacion;
      if (this.texto.textoPub == '') {
        this.ubicacion.descripcion = this.pais;
      } else {
        this.ubicacion.descripcion = this.texto.textoPub;
      }

      var fecha = new Date();

      //this.ubicacion.fecha = this.datePipe.transform(fecha,"yyyy-MM-dd") //String se comenta porque el modelo esta con Date
      this.ubicacion.fecha = fecha;
      this.ubicacion.idPersona = this.usr.usuario.idPersona;
      this.ubicacion.latitud = this.lat;
      this.ubicacion.longitud = this.long;
      this.ubicacion.pais = this.pais;
      //console.log(this.ubicacion);
      this.ubiService.altaUbicacion(this.ubicacion);
      this.texto.textoPub = '';
      this.tools.presentToast('La publicacion fue creada con exito', Resultado.Ok);
      this.cancelar();
    }
    // this.cancelar();//Vuelve a tipo texto

  }

  obtenerTipo(){
    if(this.tipo=='texto'){
      // console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.texto;
    }
    else if(this.tipo=='enlaceExterno'){
      // console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.enlaceExterno;
    }
    else if(this.tipo=='mapa'){
      // console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.mapa;
    }
    else{
      // console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.foto;
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Link externo',
      inputs: [
        {
          name: 'linkExt',
          //value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Ingrese un link'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            //console.log(alertData.linkExt);
            this.buscarPreview(alertData.linkExt);
          }
        }
      ]
    });

    await alert.present();
  }

  buscarPreview(url:string){
    this.linkPrevService.getPreview(url).subscribe((data: Preview) => {
      this.preview = data;
    });

    this.tipo = 'enlaceExterno';
  }

  buildMap(lng: number, lat: number){
    Mapboxgl.accessToken = environment.mapboxKey;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // starting position
      zoom: 15, // starting zoom
    });

    const marker = new Mapboxgl.Marker({
      color: "#000000",
      draggable: false
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);

  }


  async modalUbicacion() {
    const modal = await this.modalController.create({
      component: BuscarMapaComponent
    });

    modal.onDidDismiss()
      .then(data=>{
        if(!data.role){
          var cord: string[];
          this.cord = data.data;
          cord = data.data.split(',');
          this.long = parseFloat(cord[0]);
          this.lat = parseFloat(cord[1]);
          this.pais = cord[2];
          setTimeout(() => this.buildMap(parseFloat(cord[0]),parseFloat(cord[1])), 10);
          this.tipo = 'mapa';
        }
    });

    return await modal.present();
  }



  async modalMapaComponent() {
    const modal = await this.modalController.create({
      component: MapaComponent,
      componentProps: {
        currentLocation: true,
        marcarUbicacion: true,
        ubiCentral: new BehaviorSubject<Ubicacion>(new Ubicacion()),
        draggable: true,
        buscador: true,
        modal: true
      }
    });

    modal.onDidDismiss()
      .then(data=>{
        console.log(data);
        if(!data.role){
          var cord: string[];
          this.cord = data.data;
          cord = data.data.split(',');
          this.long = parseFloat(cord[0]);
          this.lat = parseFloat(cord[1]);
          this.pais = cord[2];
          setTimeout(() => this.buildMap(parseFloat(cord[0]),parseFloat(cord[1])), 10);
          this.tipo = 'mapa';
        }
    });

    return await modal.present();
  }

//Si es android deja sacar foto - Si es web solo deja de file system
  async selectImageSource() {

    if (this.plt.is('android')) {
      // const buttons = [
      //   {
      //     text: 'Take Photo',
      //     icon: 'camera',
      //     handler: () => {
      //       this.addImage(CameraSource.Camera);
      //     }
      //   },
      //   {
      //     text: 'Choose From Photos Photo',
      //     icon: 'image',
      //     handler: () => {
      //       this.addImage(CameraSource.Photos);
      //     }
      //   }
      // ];

      // const actionSheet = await this.actionSheetCtrl.create({
      //   header: 'Select Image Source',
      //   buttons
      // });
      // await actionSheet.present();
    }
    else{
      this.fileInput.nativeElement.click();
    }

  }

  // async addImage(source: CameraSource) {
  //   const image = await Camera.getPhoto({
  //     quality: 60,
  //     allowEditing: true,
  //     resultType: CameraResultType.Base64,
  //     source
  //   });

  //   const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
  //   const imageName = 'Give me a name';

  //   this.pubService.uploadImage(blobData, imageName, image.format);
  // }

  // Used for browser direct file upload
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
      this.imagen.base64 = img;
      this.imagen.nombre = file.name;
      this.imagen.ext = file.type;
      let base64 = [];
      base64 = img.split(',');
     this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${base64[0]}, ${base64[1]}`);
    };
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  cancelar(){
    this.tipo = 'texto';
  }

}
