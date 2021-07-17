import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonInfiniteScroll, Platform } from '@ionic/angular';
import { Publicacion, PublicacionPerfilUsuario } from 'src/app/modelos/perfil';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-feed-home',
  templateUrl: './feed-home.component.html',
  styleUrls: ['./feed-home.component.scss'],
})
export class FeedHomeComponent implements OnInit {

  loading: HTMLIonLoadingElement;
  isLoading: Boolean;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() nuevaPubli = '';

  user = {
    email: '',
    token: '',
    tokenExpirationDate: '',
    userId: ''
  }

  publicacionesAux: PublicacionPerfilUsuario[];
  publicaciones: PublicacionPerfilUsuario[];
  size: number = 10;
  offsize: number = 0;

  constructor(private pubService: PerfilService, private userService: UsuarioService, 
    private loadingCtrl: LoadingController, private plt: Platform) { }

  async ngOnInit() {
    if (this.plt.is('android')) {
      this.user = JSON.parse(localStorage.getItem('_cap_authData'));
      this.publicaciones = await this.pubService.obtenerPublicaciones(this.user.userId, this.size);
    } else {
      this.loadingCtrl.create({ keyboardClose: true, message: 'Cargando...' }).then(loadingEl => {
        loadingEl.present();
        this.loading = loadingEl;
        this.isLoading = true;
      });
      this.user = JSON.parse(localStorage.getItem('_cap_authData'));
      this.publicaciones = await this.pubService.obtenerPublicaciones(this.user.userId, this.size);
      if (this.loading != undefined) {
        this.loading.dismiss();
        this.isLoading = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    // console.log('ngOnChanges'+changes.nuevaPubli);
    if (changes.nuevaPubli.currentValue != undefined) {
      // console.log(changes.nuevaPubli.currentValue);
      // this.ngOnInit();
      this.publicaciones.unshift(changes.nuevaPubli.currentValue);
    }
    
  }

  obtenerUbicacion(publicacion: Publicacion) : String{
    var coord;
    coord = publicacion.contenido.split(',');
    return "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(" + coord[0] + ',' + coord[1] + ")/" + coord[0] + ',' + coord[1] +",7)/500x300?access_token=pk.eyJ1IjoidHJhdmVscGFjazIwMjEiLCJhIjoiY2tuNDR0cjl4MWUwbDJwbzgwcWY2NTRieSJ9.Fju2qmaYyp6zHcXCClCifg";
  }

  async doRefresh(event) {
    this.publicaciones = [];
    this.pubService.currentlyLoaded = 0;
    this.publicaciones = await this.pubService.obtenerPublicaciones(this.user.userId,this.size);
    event.target.complete();
  }

  async loadData(event?) {

    this.publicacionesAux = await this.pubService.obtenerPublicaciones(this.user.userId, this.size, event);
    this.publicacionesAux.forEach(element => {
      this.publicaciones.push(element)
    });

  }

  getPublicacionPerfil(ppu: PublicacionPerfilUsuario): Publicacion {
    return {
      idPublicacion: ppu.idPublicacion,
      contenido: ppu.contenido,
      fecha: ppu.fecha,
      tipo: {
          idPublicacion: ppu.tipo.idPublicacion,
          tipo: ppu.tipo.tipo,
      },
      idPersona: ppu.idPersona,
      extension: ppu.extension,
      nombre: ppu.nombre,
      comentarioReacciones: ppu.comentarioReacciones,
      evento: ppu.evento,
      perfil: ppu.perfil,
      cantidadLikes: ppu.cantidadLikes,
      cantidadDislikes: ppu.cantidadDislikes
    };
  }

  cargoPublicacion(publicacion: Publicacion){
    localStorage.setItem('publicacion', JSON.stringify(publicacion));
  }

  ngOnDestroy() {
    this.pubService.destroyVariables();
    console.log('*** ngOnDestroy(feed-home) ***');
  }

}
