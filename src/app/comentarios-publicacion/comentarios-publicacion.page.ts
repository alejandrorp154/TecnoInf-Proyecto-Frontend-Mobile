import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { count } from 'rxjs/operators';
import { Comentario, comentarioReacciones } from '../modelos/comentario.model';
import { ComentarioReaccion, PublicacionReaccion } from '../modelos/comentarioReaccion.model';
import { Publicacion, PublicacionPerfilUsuario } from '../modelos/perfil';
import { Preview } from '../modelos/preview';
import { CantidadReaccionComentario, TipoPublicacion } from '../modelos/publicacion.model';
import { Usuario } from '../modelos/usuario.model';
import { ComentariosService } from '../servicios/comentarios.service';
import { PubicacionService } from '../servicios/pubicacion.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from '../servicios/usuario.service';
import { PopoverComentarioComponent } from '../UI/popover-comentario/popover-comentario.component';

@Component({
  selector: 'app-comentarios-publicacion',
  templateUrl: './comentarios-publicacion.page.html',
  styleUrls: ['./comentarios-publicacion.page.scss'],
})
export class ComentariosPublicacionPage implements OnInit {

  loading: HTMLIonLoadingElement;
  isLoading: Boolean;
  publicacion: PublicacionPerfilUsuario;
  perfil: Usuario;
  preview: Preview = new Preview;
  publicacionObs: BehaviorSubject<Publicacion> = new BehaviorSubject(new Publicacion());
  comentariosObs: BehaviorSubject<comentarioReacciones[]> = new BehaviorSubject(undefined);
  comentariosReaccionesObs: BehaviorSubject<comentarioReacciones[]> = new BehaviorSubject(undefined);
  tempComentarios: comentarioReacciones[] = [];
  tempComentariosActual: comentarioReacciones[] = [];
  tempPublicacion: Publicacion;
  boolEsFoto: boolean = false;
  boolEsTexto: boolean = false;
  boolEsEnlace: boolean = false;
  boolEsMapa: boolean = false;
  boolVerComentariosHijo: boolean = false;
  boolVerComentarios: boolean = false;
  userId;
  nickname: string;
  cantReacciones: CantidadReaccionComentario;
  user: Promise<Usuario>; 

  comentarioDeForm: string = "";

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, private comentariosService: ComentariosService, 
    private publicacionService: PubicacionService, private router: ActivatedRoute, private userService: UsuarioService, private authService: AuthService,
    public popoverController: PopoverController) {}

  ngOnInit() {
    this.publicacion = new PublicacionPerfilUsuario();
    var retrievedObject = localStorage.getItem('publicacion');
    var retrievedObject2 = localStorage.getItem('perfil');
    this.publicacion = JSON.parse(retrievedObject);    
    this.getCurrentUser();

    if (retrievedObject2) {
      this.perfil = JSON.parse(retrievedObject2);
      this.publicacion.nickname = this.perfil.nickname;
      this.publicacion.imagenPerfil = this.perfil.imagenPerfil;
      this.publicacion.idPersona = this.perfil.idPersona;
      localStorage.removeItem('perfil');
    }
    localStorage.removeItem('publicacion');
    this.router.paramMap.subscribe(
       async params => {
          const id = params.get('id');
          await this.getPublicacion(id.toString());
      }
    );
    //tuve que añadir este if extra porque tiraba error de undefined en this.publicacionObs.value.tipo
    if(this.publicacionObs.value.tipo){
      if(this.publicacionObs.value.tipo.tipo == "mapa"){
        this.boolEsMapa = true;
        return;
      }
    }
  }


  getClase(comentario){
    if (comentario.idComentarioPadre != null) {
      return 'child';
    }
    return "padre";
  }


  async getPublicacion(id){
    // this.publicacionObs.next(await this.publicacionService.obtenerPublicacionPorId(id));
    this.cantReacciones = new CantidadReaccionComentario();
    this.cantReacciones = await this.publicacionService.obtenerReaccionesComentarios(this.publicacion.idPublicacion.toString())
    this.publicacionObs.next(this.publicacion);
    this.userId = this.publicacionObs.value.idPersona;
    this.tempComentarios = this.publicacionObs.value.comentarioReacciones;
    this.tempComentarios = await this.comentariosService.getComentariosPublicacion(this.publicacion.idPublicacion);
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

    this.boolVerComentarios = this.tempComentariosActual.length != 0;
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
    if(this.publicacionObs.value.tipo.tipo == "mapa"){
      this.boolEsMapa = true;
      return;
    }
  }

  async getCurrentUser(){
    var currentUser = await this.authService.getCurrentUser().toPromise();
    this.nickname = currentUser.nickname;
  }

  obtenerUbicacion(publicacion: Publicacion) : String{
    var coord;
    coord = publicacion.contenido.split(',');
    return "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(" + coord[0] + ',' + coord[1] + ")/" + coord[0] + ',' + coord[1] +",7)/500x300?access_token=pk.eyJ1IjoidHJhdmVscGFjazIwMjEiLCJhIjoiY2tuNDR0cjl4MWUwbDJwbzgwcWY2NTRieSJ9.Fju2qmaYyp6zHcXCClCifg";
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
              this.loadingCtrl.create({ keyboardClose: true, message: 'Cargando...' }).then(loadingEl => {
                loadingEl.present();
                this.loading = loadingEl;
                this.isLoading = true;
              });
              const newComentario = new Comentario;
              newComentario.contenido = data.comentarioNuevo;
              newComentario.fecha = new Date();
              newComentario.idPublicacion = this.publicacionObs.value.idPublicacion;
              newComentario.idPersona = this.userId;
              newComentario.idComentarioPadre = comentario.idComentario;
              newComentario.nickname = this.nickname;
              await this.comentariosService.addComentario(newComentario);
              await this.getPublicacion(this.publicacionObs.value.idPublicacion);      
              if (this.loading != undefined) {
                this.loading.dismiss();
                this.isLoading = false;
              } 
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

  enableCreate(){
    return this.comentarioDeForm.trim() === "";
  }

  async aniadirComentarioAPublicacion(){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Cargando...' }).then(loadingEl => {
      loadingEl.present();
      this.loading = loadingEl;
      this.isLoading = true;
    });
    
    const tempCom = this.comentarioDeForm;
    this.comentarioDeForm = "";

    const newComentario = new Comentario;
    newComentario.contenido = tempCom;
    newComentario.fecha = new Date();
    newComentario.idPublicacion = this.publicacionObs.value.idPublicacion;
    newComentario.idPersona = this.userId;
    newComentario.idComentarioPadre = null;
    newComentario.nickname = this.nickname;

    const newComentarioRespuesta = await this.comentariosService.addComentario(newComentario);
    
    const newComentarioReaccion = new comentarioReacciones;
    newComentarioReaccion.idComentario = newComentarioRespuesta.idComentario;
    newComentarioReaccion.contenido = tempCom;
    newComentarioReaccion.fecha = new Date();
    newComentarioReaccion.idPublicacion = this.publicacionObs.value.idPublicacion;
    newComentarioReaccion.idComentarioPadre = null;
    newComentarioReaccion.idPersona = this.userId;
    newComentarioReaccion.idPersona = this.userId;
    newComentarioReaccion.idPersona = this.userId;
    newComentarioReaccion.cantidadLikes = 0;
    newComentarioReaccion.cantidadDislikes = 0;
    newComentarioReaccion.comentariosHijos = [];
    newComentarioReaccion.document = null;
    newComentarioReaccion.nickname = this.nickname;

    this.tempComentariosActual.push(newComentarioReaccion);
    this.comentariosReaccionesObs.next(this.tempComentariosActual);
    this.boolVerComentarios = true;

    if (this.loading != undefined) {
      this.loading.dismiss();
      this.isLoading = false;
    } 
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

    const { data } = await popover.onWillDismiss();
    try {
      if(data.clicked === "Eliminar"){
        let comeReac = new comentarioReacciones;
        this.tempComentariosActual.forEach(com => {
          if(com.idComentario = comentario.idComentario){
            comeReac = com;
          }
        });

        const index = this.tempComentariosActual.indexOf(comeReac);
        if (index > -1) {
          this.tempComentariosActual.splice(index, 1);
        }
        this.boolVerComentarios = this.tempComentariosActual.length != 0;
        this.comentariosReaccionesObs.next(this.tempComentariosActual);

      }
    }catch (error){}
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