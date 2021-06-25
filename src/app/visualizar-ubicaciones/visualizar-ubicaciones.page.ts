import { Component, Input, OnInit } from '@angular/core';
import { Ubicacion } from '../modelos/ubicacion.model';
import { VisualizarUbicacionesService } from '../servicios/visualizar-ubicaciones.service';
import { AuthService } from '../servicios/auth.service';
import { take } from 'rxjs/operators';
import { UserFire } from '../modelos/userFire.model';
import { BehaviorSubject } from 'rxjs';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { PopoverUbicacionesComponent } from '../UI/popover-ubicaciones/popover-ubicaciones.component';
import { UbicacionService } from '../servicios/ubicacion.service';

@Component({
  selector: 'app-visualizar-ubicaciones',
  templateUrl: './visualizar-ubicaciones.page.html',
  styleUrls: ['./visualizar-ubicaciones.page.scss'],
})
export class VisualizarUbicacionesPage implements OnInit {

  public ubicaciones:BehaviorSubject<Ubicacion[]> = new BehaviorSubject<Ubicacion[]>([]);
  public id: string = "FDVpym0yZadqj4vp3lH4oWrPkBg1";

  //@Input() id;
  //@Input() nickname;

  public ubicacionClickeada:BehaviorSubject<Ubicacion> = new BehaviorSubject<Ubicacion>(new Ubicacion);
  editando: boolean;
  ubicacion: Ubicacion;

  constructor(private ubicacionService: UbicacionService, public modalController: ModalController,public popoverController: PopoverController, private alertCtrl: AlertController, private authService: AuthService, private ubicacionesService: VisualizarUbicacionesService) {
  }

  async ngOnInit() {
    await this.getAllUbicaciones();
  }

  async getAllUbicaciones(){
    await this.ubicacionesService.getAllUbicacionesAsync(this.id).then( res =>
      {
        this.ubicaciones.next(res);
      }

    );

  }

  onDeleteUbicacion(idUbicacion: number){
    this.alertCtrl
      .create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que deseas eliminar esta ubicación?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Borrar',
            cssClass: 'alrtDanger',
            handler: async () => {
              await this.ubicacionService.deleteUbicacion(idUbicacion);
              await this.getAllUbicaciones();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverUbicacionesComponent,
      cssClass: 'visualizar-ubicaciones.page.scss',
      event: ev,
      translucent: true,
      componentProps: {ubicaciones: this.ubicaciones},
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();

    try {
      if(data.clicked === "Ver"){
        this.ubicacionClickeada.next(data.value);
        return;
      }
  
      if(data.clicked === "Borrar"){
        this.onDeleteUbicacion(data.value.idUbicacion);
        this.ubicaciones.next(this.ubicaciones.value.splice(this.ubicaciones.value.findIndex(data.value.idUbicacion), 1));
        return;
      }
  
      if(data.clicked === "Modificar"){
        this.ubicacion = data.value;
        this.editando = true;
        return;
      }
    } catch (error){}
      
    
  }
  
  marcarUbicacion(ubicacion: Ubicacion) {
  const nuevaUbicacion = this.ubicacion;
  nuevaUbicacion.latitud = ubicacion.latitud;
  nuevaUbicacion.longitud = ubicacion.longitud;
  
    this.alertModificarUbicacion(nuevaUbicacion).then((result) => {
      this.editando = false;
    });
  }

  
  alertModificarUbicacion(ubicacion: Ubicacion):Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ctl = this.alertCtrl;
      let alert:any = this.alertCtrl.create({
        header: '¿Estas seguro?',
        message: '¿Estas seguro que deseas modificar esta ubicación?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              ctl.dismiss().then(() => { resolve(false); });
              return false;
              }
          },
          {
            text: 'Modificar',
            handler: () => {
            ctl.dismiss().then(async() => { 
              console.log("tiene:", ubicacion);
              await this.ubicacionService.modificarUbicacion(ubicacion);
              await this.getAllUbicaciones(); 
              resolve(false);
            });
            return false;
            }
        }]
      }).then((dlg) => dlg.present());
    });
  }

}
