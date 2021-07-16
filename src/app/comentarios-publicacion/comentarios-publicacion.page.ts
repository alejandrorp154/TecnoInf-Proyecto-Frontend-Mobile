import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { count } from 'rxjs/operators';
import { Comentario, comentarioReacciones } from '../modelos/comentario.model';
import { ComentarioReaccion, PublicacionReaccion } from '../modelos/comentarioReaccion.model';
import { Publicacion } from '../modelos/perfil';
import { Preview } from '../modelos/preview';
import { CantidadReaccionComentario, TipoPublicacion } from '../modelos/publicacion.model';
import { ComentariosService } from '../servicios/comentarios.service';
import { PubicacionService } from '../servicios/pubicacion.service';
import { PopoverComentarioComponent } from '../UI/popover-comentario/popover-comentario.component';

@Component({
  selector: 'app-comentarios-publicacion',
  templateUrl: './comentarios-publicacion.page.html',
  styleUrls: ['./comentarios-publicacion.page.scss'],
})
export class ComentariosPublicacionPage implements OnInit {

  publicacion: Publicacion;
  preview: Preview = new Preview;
  publicacionObs: BehaviorSubject<Publicacion> = new BehaviorSubject(new Publicacion());
  comentariosObs: BehaviorSubject<Comentario[]> = new BehaviorSubject(undefined);
  comentariosReaccionesObs: BehaviorSubject<comentarioReacciones[]> = new BehaviorSubject(undefined);
  tempComentarios: comentarioReacciones[] = [];
  tempComentariosActual: comentarioReacciones[] = [];
  tempPublicacion: Publicacion;
  boolEsFoto: boolean = false;
  boolEsTexto: boolean = false;
  boolEsEnlace: boolean = false;
  boolVerComentariosHijo: boolean = false;
  boolVerComentarios: boolean = false;
  userId;
  cantReacciones: CantidadReaccionComentario;

  public comentarioForm = new FormGroup({
    comentario: new FormControl()
  });

  constructor(private alertCtrl: AlertController, private comentariosService: ComentariosService, 
    private publicacionService: PubicacionService, private router: ActivatedRoute,
    public popoverController: PopoverController) {}

  ngOnInit() {
    this.publicacion = new Publicacion();
    var retrievedObject = localStorage.getItem('publicacion');
    this.publicacion = JSON.parse(retrievedObject);
    localStorage.removeItem('publicacion');
    this.router.paramMap.subscribe(
      params => {
          const id = params.get('id');
          this.getPublicacion(id.toString());
      }
    );
  }


  async getPublicacion(id){
    // this.publicacionObs.next(await this.publicacionService.obtenerPublicacionPorId(id));
    this.cantReacciones = new CantidadReaccionComentario();
    this.cantReacciones = await this.publicacionService.obtenerReaccionesComentarios(this.publicacion.idPublicacion.toString())
    this.publicacionObs.next(this.publicacion);
    this.userId = this.publicacionObs.value.idPersona;
    this.tempComentarios = this.publicacionObs.value.comentarioReacciones;
    
    this.tempComentariosActual = [];
    
    this.tempComentarios.forEach(comentario => {
      this.tempComentariosActual.push(comentario);
      if(comentario.comentariosHijos){
        comentario.comentariosHijos.forEach(coment => {
          this.tempComentariosActual.push(coment);
        });
      }
    });
    this.comentariosReaccionesObs.next(this.tempComentariosActual);

    this.boolVerComentarios = true;
    if(this.publicacionObs.value.tipo.tipo == "texto"){
      this.boolEsTexto = true;
      return;
    }
    if(this.publicacionObs.value.tipo.tipo == "foto"){
      this.boolEsFoto = true;
      return;
    }
    if(this.publicacionObs.value.tipo.tipo == "enlaceExterno"){
      var prev: string[];
      prev = this.publicacionObs.value.contenido.split('|*|');
      this.preview.title = prev[0];
      this.preview.description = prev[1];
      this.preview.image = prev[2];
      this.preview.url = prev[3];
      this.boolEsEnlace = true;
      return;
    }
  }

  aniadirComentarioAComentario(comentario: comentarioReacciones){
    this.alertCtrl.create({
      header: 'Añadir comentario',
      inputs: [
        {
          name: 'comentarioNuevo',
          placeholder: 'Comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Añadir',
          handler: async data => {
            if (data.comentarioNuevo !== '') {
              const newComentario = new Comentario;
              newComentario.contenido = data.comentarioNuevo;
              newComentario.fecha = new Date();
              newComentario.idPublicacion = this.publicacionObs.value.idPublicacion;
              newComentario.idPersona = this.userId;
              newComentario.idComentarioPadre = comentario.idComentario;
              await this.comentariosService.addComentario(newComentario);
              this.getPublicacion(this.publicacionObs.value.idPublicacion);       
            } else {
              return;
            }
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }

  aniadirComentarioAPublicacion(){
    console.log(this.comentarioForm.value.comentario);
    const newComentario = new Comentario;
    newComentario.contenido = this.comentarioForm.value.comentario;
    newComentario.fecha = new Date();
    newComentario.idPublicacion = this.publicacionObs.value.idPublicacion;
    newComentario.idPersona = this.userId;
    newComentario.idComentarioPadre = null;
    console.log(newComentario);
    this.comentariosService.addComentario(newComentario);
    //this.getPublicacion(this.publicacionObs.value.idPublicacion);
  }  

  async presentPopover(ev: any, comentario: comentarioReacciones) {
    const popover = await this.popoverController.create({
      component: PopoverComentarioComponent,
      componentProps: {Comentario:  comentario},
      event: ev,
      translucent: false,
      mode: 'ios'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  async reaccionarComentario(comentario: comentarioReacciones, reaccion: string){
    const newReaccion = new ComentarioReaccion;
    newReaccion.idComentario = comentario.idComentario;
    newReaccion.idPersona= this.userId;
    newReaccion.reaccion = reaccion;
    await this.comentariosService.addComentarioReaccion(newReaccion);
    this.getPublicacion(this.publicacionObs.value.idPublicacion); 
    if (newReaccion.reaccion == 'MeGusta') {
      comentario.cantidadLikes =+ 1;
    } else {
      comentario.cantidadDislikes =+ 1;
    }
  }

  async reaccionarAPublicacion(reaccion: string){
    const newReaccion = new PublicacionReaccion;
    newReaccion.idPublicacion = this.publicacionObs.value.idPublicacion;
    newReaccion.idPersona= this.userId;
    newReaccion.reaccion = reaccion;
    await this.comentariosService.addPublicacionReaccion(newReaccion);
    if (newReaccion.reaccion == 'MeGusta') {
      this.cantReacciones.cantidadLikes =+ 1;
    } else {
      this.cantReacciones.cantidadDislikes =+ 1;
    }
    
    //this.getPublicacion(this.publicacionObs.value.idPublicacion); 
  }

}
