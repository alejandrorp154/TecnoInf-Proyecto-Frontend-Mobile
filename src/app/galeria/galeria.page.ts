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

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  perfil: Perfil;
  usuario: BehaviorSubject<Usuario> = new BehaviorSubject(new Usuario("","", "","", "","","","", "","", ""));
  galeria: BehaviorSubject<Multimedia[]> = new BehaviorSubject([]);

  constructor(private perfilServ: PerfilService,
  private router: ActivatedRoute,
  private platform: Platform,
  private viewer: PhotoViewer,
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
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    this.usuario.next(this.perfil.usuario);
    this.galeria.next(this.perfil.galerias)
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
