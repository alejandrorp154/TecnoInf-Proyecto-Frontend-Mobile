import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Publicacion } from 'src/app/modelos/perfil';
import { LikeDisLike, Reaccion } from 'src/app/modelos/publicacion.model';
import { Usuario } from 'src/app/modelos/usuario.model';
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

  //count: number = 0;

  constructor(private pubService: PubicacionService, public popoverController: PopoverController) {
    //this.llenoFeed();
   }

  ngOnInit() {
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
  
  async presentPopover(ev: any, publicacion: Publicacion) {
    const popover = await this.popoverController.create({
      component: PopoverPublicacionesComponent,
      componentProps: {Publicacion:  publicacion},
      event: ev,
      translucent: false,
      mode: 'ios'
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  // async llenoFeed(){
  //   for (let i = 0; i < 5; i++) {  // here you can limit the items according to your needs.
  //     this.publicaciones.value.push(this.publicaciones.value[this.count]);   // your JSON data which you want to display
  //     this.count++ //i am using a count variable to keep track of inserted records to avoid inserting duplicate records on infinite scroll
  //     console.log(this.count);
  //   }
  // }

  // doInfinite(infiniteScroll) {
  //   setTimeout(() => {
  //     for (let i = 0; i < 5; i++) { 
  //       this.publicaciones.value.push(this.publicaciones.value[this.count]); // this will start pushing next 5 items
  //       this.count++
  //     }
  //     infiniteScroll.complete();
  //   }, 500);
  // }

}
