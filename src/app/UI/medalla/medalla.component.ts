import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medalla, Usuario } from 'src/app/modelos/perfil';

@Component({
  selector: 'app-medalla',
  templateUrl: './medalla.component.html',
  styleUrls: ['./medalla.component.scss'],
})
export class MedallaComponent implements OnInit {

  @Input() medalla: BehaviorSubject<Medalla>;

  constructor() { }

  ngOnInit() {}

// null-wolf 0
// iron-wolf 75
// bronze-wolf 150
// silver-wolf 300
// gold-wolf 600
// platinum-wolf 1200
// diamond-wolf 2400
// master-wolf 4800
// alfa-wolf 10000

}
