import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Publicacion } from 'src/app/modelos/perfil';
import { Usuario } from 'src/app/modelos/usuario.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  @Input() publicaciones: BehaviorSubject<Publicacion[]>;
  @Input() usuario: BehaviorSubject<Usuario>;

  //count: number = 0;

  constructor() {
    //this.llenoFeed();
   }

  ngOnInit() {
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
