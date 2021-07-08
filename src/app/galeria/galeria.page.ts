import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Multimedia } from '../modelos/multimedia.model';
import { Perfil } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { PerfilService } from '../servicios/perfil.service';
import { Platform, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { GaleriaModalPage } from '../galeria-modal/galeria-modal.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  perfil: Perfil;
  usuario: BehaviorSubject<Usuario> = new BehaviorSubject(new Usuario("","", "","", "","","","", "","", ""));
  galeria: BehaviorSubject<Multimedia[]> = new BehaviorSubject([]);
  isLoading: Boolean;
  loading: HTMLIonLoadingElement;

  constructor(private perfilServ: PerfilService,
  private router: ActivatedRoute,
  private platform: Platform,
  private viewer: PhotoViewer,
  private loadingCtrl: LoadingController,
  private modalController: ModalController) {

    this.router.paramMap.subscribe(
      params => {
          const id = params.get('id');
          this.obtenerPerfil(id.toString());
      }
  );
  }

  ngOnInit() {

  }

  async obtenerPerfil(id: string){
    this.loadingCtrl.create({ keyboardClose: true, message: 'Cargando...' }).then(loadingEl =>{
      loadingEl.present();
      this.loading = loadingEl;
      this.isLoading = true;
    });
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    this.usuario.next(this.perfil.usuario);
    this.galeria.next(this.perfil.galerias);
    if (this.loading != undefined) {
      this.loading.dismiss();
      this.isLoading = false;
    }
  }

  async openPreview(img)
  {
    const modal = await this.modalController.create({
      component: GaleriaModalPage,
      cssClass: 'transparent-modal',
      componentProps: {img}
    });
    modal.present()
  }

}
