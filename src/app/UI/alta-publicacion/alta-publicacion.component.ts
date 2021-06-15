import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Preview } from 'src/app/Models/preview';
import { LinkPrevService } from 'src/app/servicios/link-prev.service';
import { BuscarMapaComponent } from '../buscar-mapa/buscar-mapa.component';
import { PubicacionService } from 'src/app/servicios/pubicacion.service';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { idPersona, Publicacion, TipoPublicacion, TipoPublicacionEnum, usuario } from 'src/app/modelos/publicacion.model';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-alta-publicacion',
  templateUrl: './alta-publicacion.component.html',
  styleUrls: ['./alta-publicacion.component.scss'],
})
export class AltaPublicacionComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(private alertController: AlertController, private linkPrevService: LinkPrevService,
     public modalController: ModalController, private pubService: PubicacionService,
     private plt: Platform, private actionSheetCtrl: ActionSheetController,
     private sanitizer: DomSanitizer) { }

  preview: Preview = new Preview;

  imageResponse: any;
  options: any;

  tipo: string = 'texto';

  publicacion: Publicacion;

  mapa: Mapboxgl.map;

  imageSource;
  imagen = {
    base64: '',
    nombre: '',
    ext: ''
  }

  public usr: usuario;
  public idPer: idPersona;
  public tipoPub: TipoPublicacion;

  texto = {textoPub: ''}

  cord: string;

  ngOnInit() {}

  publicar(){
    this.usr = new usuario();
    this.idPer = new idPersona();
    this.tipoPub = new TipoPublicacion();
    this.idPer.idPersona = '1'; //Cambiar por usuario logeado
    this.usr.usuario = this.idPer;
    this.tipoPub.tipo = this.obtenerTipo();
    if(this.tipo=='texto'){
      this.tipoPub.tipo = TipoPublicacionEnum.texto;
      this.publicacion = new Publicacion(this.tipoPub,this.texto.textoPub,'','',this.usr);
      console.log(this.publicacion);
      this.pubService.altaPublicacion(this.publicacion);
    }
    else if(this.tipo=='enlaceExterno'){
      this.tipoPub.tipo = TipoPublicacionEnum.enlaceExterno;
      var prev = this.preview.title+'|*|'+this.preview.description+'|*|'+this.preview.image+'|*|'+this.preview.url;
      console.log(this.tipoPub);
      this.publicacion = new Publicacion(this.tipoPub,prev,'','',this.usr);
      console.log(this.publicacion);
      this.pubService.altaPublicacion(this.publicacion);
    }
    else if(this.tipo=='foto'){
      console.log(this.imagen);
      this.tipoPub.tipo = TipoPublicacionEnum.foto;
      this.publicacion = new Publicacion(this.tipoPub,this.imagen.base64,this.imagen.nombre,this.imagen.ext,this.usr);
      console.log(this.publicacion);
      this.pubService.altaPublicacion(this.publicacion);
    }
    else{
      this.tipoPub.tipo = TipoPublicacionEnum.mapa;
      this.publicacion = new Publicacion(this.tipoPub,this.cord,'','',this.usr);
      this.pubService.altaPublicacion(this.publicacion);
    }
    console.log('Salgo');
    this.cancelar();//Vuelve a tipo texto
  }

  obtenerTipo(){
    if(this.tipo=='texto'){
      console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.texto;
    }
    else if(this.tipo=='enlaceExterno'){
      console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.enlaceExterno;
    }
    else if(this.tipo=='mapa'){
      console.log(this.tipo);
      return this.tipoPub.tipo = TipoPublicacionEnum.mapa;
    }
    else{
      console.log(this.tipo);
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
      zoom: 12, // starting zoom
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
          setTimeout(() => this.buildMap(parseFloat(cord[0]),parseFloat(cord[1])), 5);
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
