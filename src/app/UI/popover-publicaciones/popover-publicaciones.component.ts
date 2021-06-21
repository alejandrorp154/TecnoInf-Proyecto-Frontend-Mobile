import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Preview } from 'src/app/modelos/preview';
import { Publicacion } from 'src/app/modelos/publicacion.model';
import { LinkPrevService } from 'src/app/servicios/link-prev.service';
import { PubicacionService } from 'src/app/servicios/pubicacion.service';

@Component({
  selector: 'app-popover-publicaciones',
  templateUrl: './popover-publicaciones.component.html',
  styleUrls: ['./popover-publicaciones.component.scss'],
})
export class PopoverPublicacionesComponent implements OnInit {

  @Input() Publicacion: Publicacion;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  imagen = {
    base64: '',
    nombre: '',
    ext: ''
  }

  preview: Preview = new Preview;

  constructor(public alertController: AlertController, private pubService: PubicacionService,
    private linkPrevService: LinkPrevService) { }

  ngOnInit() {}

  async borrarPublicacion(idPublicacion: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar publicacion',
      message: '<strong>¿Esta seguro que desea eliminar la publicacion?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.pubService.eliminarPublicacion(idPublicacion);
          }
        }
      ]
    });

    await alert.present();
  }

  async modificarPublicacionURL(publicacion: Publicacion) {
    let url = [];
    url = publicacion.contenido.split('|*|');
    const alert = await this.alertController.create({
      header: 'Link externo',
      inputs: [
        {
          name: 'linkExt',
          type: 'url',
          value: url[3],
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
          handler: async (alertData) => {
            await this.buscarPreview(alertData.linkExt).then(()=>{
              var prev = this.preview.title+'|*|'+this.preview.description+'|*|'+this.preview.image+'|*|'+this.preview.url;
              publicacion.contenido = prev;
            });
            
           console.log(publicacion);
           this.pubService.modificarPublicacion(publicacion);
          }
        }
      ]
    });

    await alert.present();
  }

  async buscarPreview(url:string){
    await this.linkPrevService.getPreview(url).toPromise().then((data: Preview) => {
        this.preview = data;
        console.log(this.preview);
    });
  }

  async modificarPublicacionTexto(publicacion: Publicacion) {
    const alert = await this.alertController.create({
      header: 'Texto',
      inputs: [
        {
          name: 'texto',
          type: 'text',
          value: publicacion.contenido,
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
            console.log(alertData.texto);
            publicacion.contenido = alertData.texto;
            this.pubService.modificarPublicacion(publicacion);
          }
        }
      ]
    });

    await alert.present();
  }

  async selectImageSource() {

    this.fileInput.nativeElement.click();
    
  }

  uploadFile(event, publicacion: Publicacion) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img: string | ArrayBuffer = reader.result as string;
      this.imagen.base64 = img;
      this.imagen.nombre = file.name;
      this.imagen.ext = file.type;
      this.modificarPublicacionImagen(publicacion);
    };
  }

  async modificarPublicacionImagen(publicacion: Publicacion) {
    const alert = await this.alertController.create({
      header: 'Modificar Imagen',
      inputs: [
        {
          name: 'imagen',
          type: 'text',
          value: this.imagen.nombre
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
            publicacion.contenido = this.imagen.base64;
            publicacion.nombre = this.imagen.nombre;
            publicacion.extension = this.imagen.ext;
            console.log(publicacion);
            this.pubService.modificarPublicacion(publicacion);
          }
        }
      ]
    });

    await alert.present();
  }

}
