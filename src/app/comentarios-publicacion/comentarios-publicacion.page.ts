import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { count } from 'rxjs/operators';
import { Comentario, comentarioReacciones } from '../modelos/comentario.model';
import { ComentarioReaccion, PublicacionReaccion } from '../modelos/comentarioReaccion.model';
import { Publicacion } from '../modelos/perfil';
import { Preview } from '../modelos/preview';
import { TipoPublicacion } from '../modelos/publicacion.model';
import { ComentariosService } from '../servicios/comentarios.service';
import { PubicacionService } from '../servicios/pubicacion.service';

@Component({
  selector: 'app-comentarios-publicacion',
  templateUrl: './comentarios-publicacion.page.html',
  styleUrls: ['./comentarios-publicacion.page.scss'],
})
export class ComentariosPublicacionPage implements OnInit {

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


  constructor(private alertCtrl: AlertController, private comentariosService: ComentariosService, private publicacionService: PubicacionService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.paramMap.subscribe(
      params => {
          const id = params.get('id');
          this.getPublicacion(id.toString());
      }
    );
    //var user = JSON.parse(localStorage.getItem('_cap_currentUser'));
    //this.userId = user.idPersona;
  }


  async getPublicacion(id){
    this.publicacionObs.next(await this.publicacionService.obtenerPublicacionPorId(id));
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
    if(this.publicacionObs.value.tipo.tipo = "texto"){
      this.boolEsTexto = true;
      return;
    }
    if(this.publicacionObs.value.tipo.tipo = "foto"){
      this.boolEsEnlace = true;
      return;
    }
    if(this.publicacionObs.value.tipo.tipo = "enlaceExterno"){
      var prev: string[];
      prev = this.publicacionObs.value.contenido.split('|*|');
      this.preview.title = prev[0];
      this.preview.description = prev[1];
      this.preview.image = prev[2];
      this.preview.url = prev[3];
      this.boolEsFoto = true;
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
              newComentario.idComentarioPadre = null;
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

  modificarComentario(comentario: comentarioReacciones){
    this.alertCtrl.create({
      header: 'Modificar comentario',
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
          text: 'Modificar',
          handler: async data => {
            if (data.comentarioNuevo !== '') {
              comentario.contenido = data.comentarioNuevo;
              await this.comentariosService.modificarComentario(comentario);
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


  eliminarComentario(idComentario: string){
    this.alertCtrl
      .create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que deseas eliminar este comentario?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Borrar',
            handler: async () => {
              await this.comentariosService.deleteComentario(idComentario);
              this.getPublicacion(this.publicacionObs.value.idPublicacion);    
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }


  async reaccionarComentario(comentario: comentarioReacciones, reaccion: string){
    const newReaccion = new ComentarioReaccion;
    newReaccion.idComentario = comentario.idComentario;
    newReaccion.idPersona= this.userId;
    newReaccion.reaccion = reaccion;
    await this.comentariosService.addComentarioReaccion(newReaccion);
    this.getPublicacion(this.publicacionObs.value.idPublicacion); 
  }

  async reaccionarAPublicacion(reaccion: string){
    const newReaccion = new PublicacionReaccion;
    newReaccion.idPublicacion = this.publicacionObs.value.idPublicacion;
    newReaccion.idPersona= this.userId;
    newReaccion.reaccion = reaccion;
    await this.comentariosService.addPublicacionReaccion(newReaccion);
    this.getPublicacion(this.publicacionObs.value.idPublicacion); 
  }

  

}
