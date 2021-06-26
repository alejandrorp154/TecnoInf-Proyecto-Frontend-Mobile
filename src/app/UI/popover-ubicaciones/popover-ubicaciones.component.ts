import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Ubicacion } from 'src/app/modelos/ubicacion.model';
import { VisualizarUbicacionesService } from 'src/app/servicios/visualizar-ubicaciones.service';

@Component({
  selector: 'app-popover-ubicaciones',
  templateUrl: './popover-ubicaciones.component.html',
  styleUrls: ['./popover-ubicaciones.component.scss'],
})
export class PopoverUbicacionesComponent implements OnInit {

  items: Ubicacion[];
  @Input() ubicaciones;
  noItems: boolean;

  constructor(private popoverCtrl: PopoverController) {
    this.noItems = false;
  }

  ngOnInit() {
  this.ubicaciones.subscribe(ub => {
    this.items = ub as Ubicacion[]
  });
  this.noItems = this.items.length === 0;
  }

  onClick( valor: any, clickeado: string){
    this.popoverCtrl.dismiss({
      clicked: clickeado,
      value: valor
    })
  }

}
