import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Publicacion } from 'src/app/modelos/perfil';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  @Input() publicaciones: BehaviorSubject<Publicacion[]>;

  pub: Publicacion[] = [];

  constructor() { }

  ngOnInit() {
    //this.publicaciones.subscribe(pub => console.log(pub));
    //console.log(this.pub);
  }

}
