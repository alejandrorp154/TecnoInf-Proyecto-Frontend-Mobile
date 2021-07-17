import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Publicacion } from 'src/app/modelos/perfil';
import { LikeDisLike, Reaccion } from 'src/app/modelos/publicacion.model';
import { UserFire } from 'src/app/modelos/userFire.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { AuthService } from 'src/app/servicios/auth.service';
import { PubicacionService } from 'src/app/servicios/pubicacion.service';
import { PopoverPublicacionesComponent } from '../popover-publicaciones/popover-publicaciones.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  @Input() publicaciones: BehaviorSubject<Publicacion[]>;
  @Input() usuario: BehaviorSubject<Usuario>;

  reaccion: Reaccion;

  userFire: UserFire;

  constructor(private pubService: PubicacionService, public popoverController: PopoverController,
    private authService: AuthService) {
    
   }

  async ngOnInit() {
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    
  }

  like(publicacion: Publicacion){
    publicacion.cantidadLikes =+ 1;
    this.reaccion = new Reaccion;
    this.reaccion.idPersona = this.usuario.value.idPersona;
    this.reaccion.idPublicacion = publicacion.idPublicacion;
    this.reaccion.reaccion = LikeDisLike.MeGusta;
    this.pubService.reaccionar(this.reaccion);
  }

  dislike(publicacion: Publicacion){
    publicacion.cantidadDislikes =+ 1;
    this.reaccion = new Reaccion;
    this.reaccion.idPersona = this.usuario.value.idPersona;
    this.reaccion.idPublicacion = publicacion.idPublicacion;
    this.reaccion.reaccion = LikeDisLike.NoMeGusta;
    this.pubService.reaccionar(this.reaccion);
  }

  obtenerUbicacion(publicacion: Publicacion) : String{
    var coord;
    coord = publicacion.contenido.split(',');
    return "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(" + coord[0] + ',' + coord[1] + ")/" + coord[0] + ',' + coord[1] +",7)/500x300?access_token=pk.eyJ1IjoidHJhdmVscGFjazIwMjEiLCJhIjoiY2tuNDR0cjl4MWUwbDJwbzgwcWY2NTRieSJ9.Fju2qmaYyp6zHcXCClCifg";
  }
  
  async presentPopover(ev: any, publicacion: Publicacion) {
    const popover = await this.popoverController.create({
      component: PopoverPublicacionesComponent,
      componentProps: {Publicacion:  publicacion, Popover: this.popoverController},
      event: ev,
      translucent: false,
      mode: 'ios'
    });
    await popover.present();

    // const { role } = await popover.onDidDismiss()
    await popover.onDidDismiss()
    .then((result) => {
      console.log(result['data']);
      if (result['data']=='eliminar') {
        console.log('eliminar');
        this.popoverController.dismiss();
        this.publicaciones.value.splice(this.publicaciones.value.findIndex(p => {
          return p.idPublicacion == publicacion.idPublicacion;
        }), 1)
      } else {
        console.log('modificar');
        this.popoverController.dismiss();     
      }
    });
    
  }

}
