import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medalla, rangos } from 'src/app/modelos/medalla.model';


@Component({
  selector: 'app-medalla',
  templateUrl: './medalla.component.html',
  styleUrls: ['./medalla.component.scss'],
})
export class MedallaComponent implements OnInit {
  @Input() medalla: BehaviorSubject<Medalla>;
  medallaUrl: string;
  progreso: number;
  puntosTotales: number;
  puntosActuales: number;
  medallaName: string;

  constructor() {
  }

  ngOnInit() {

    this.medalla.subscribe( med =>
      {
        if (med) {
          switch(med.rango.toString())
          {
            case 'ironWolf':
            {
              this.medallaUrl = "../../assets/img/Iron.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 75
              this.puntosTotales = 75;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Iron Wolf";
              break;
            }
            case 'bronzeWolf':
            {
              this.medallaUrl = "../../assets/img/Bronce.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 150
              this.puntosTotales = 150;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Bronce Wolf";
              break;
            }
            case 'silverWolf':
            {
              this.medallaUrl = "../../assets/img/Silver.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 300
              this.puntosTotales = 300;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Silver Wolf";
              break;
            }
            case 'goldWolf':
            {
              this.medallaUrl = "../../assets/img/Gold.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 600
              this.puntosTotales = 600;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Gold Wolf";
              break;
            }
            case 'platinumWolf':
            {
              this.medallaUrl = "../../assets/img/Platinum.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 1200
              this.puntosTotales = 1200;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Platinum Wolf";
              break;
            }
            case 'diamondWolf':
            {
              this.medallaUrl = "../../assets/img/Diamond.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 2400
              this.puntosTotales = 2400;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Diamond Wolf";
              break;
            }
            case 'masterWolf':
            {
              this.medallaUrl = "../../assets/img/Master.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 4800
              this.puntosTotales = 4800;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Master Wolf";
              break;
            }
            case 'alfaWolf':
            {
              this.medallaUrl = "../../assets/img/Alfa.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 10000
              this.puntosTotales = 10000;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "Alfa Wolf";
              break;
            }
            default:
            {
              this.medallaUrl = "../../assets/img/Null.png";
              this.progreso = (this.medalla.value.cantidadPuntos * 100) / 1
              this.puntosTotales = 1;
              this.puntosActuales = this.medalla.value.cantidadPuntos;
              this.medallaName = "New Wolf";
            }
          }
        } else {
          this.medallaUrl = "../../assets/img/Null.png";
          this.progreso = 0;
          this.puntosTotales = 75;
          this.puntosActuales = 0;
          this.medallaName = "Noob Wolf";
        }

      }
    )

  }

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
