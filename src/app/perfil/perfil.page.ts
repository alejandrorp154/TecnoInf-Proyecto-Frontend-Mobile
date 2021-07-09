import { UserFire } from "./../modelos/userFire.model";
import { AuthService } from "src/app/servicios/auth.service";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medalla } from '../modelos/medalla.model';
import { Perfil, Publicacion } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { PerfilService } from '../servicios/perfil.service';
import { Multimedia } from '../modelos/multimedia.model';
import { AlertController , LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil: Perfil;

  publicaciones: BehaviorSubject<Publicacion[]> = new BehaviorSubject([]);
  usuario: BehaviorSubject<Usuario> = new BehaviorSubject(undefined);
  medalla: BehaviorSubject<Medalla> = new BehaviorSubject(undefined);
  galleria: BehaviorSubject<Multimedia[]> = new BehaviorSubject([]);

  userFire: UserFire;
  idPerfil;
  loading: HTMLIonLoadingElement;
  isLoading: Boolean;
  esMiPerfil: boolean;

  textoBoton = 'AGREGAR CONTACTO';

  contactos: number;

  constructor(
    private perfilServ: PerfilService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuarioService
    ) {
  }

  async ngOnInit() {
    this.router.paramMap.subscribe(
      params => {        
        const id = params.get('id');
        this.obtenerPerfil(id.toString());
        this.idPerfil = id;
      }
      );      
        this.userFire = await this.authService.getCurrentUserFire().toPromise();
        this.esContacto(this.idPerfil);
        if(!this.EsMiPerfil && this.esContacto(this.idPerfil)){
          this.textoBoton = "ELIMINAR CONTACTO";
        }
  }

  deleteAccount(){
    this.alertCtrl
    .create({
      header: 'Eliminar cuenta',
      message: 'Esta a punto de borrar permanentemente su cuenta. ¿Seguro que desea continuar?',
      buttons: [
        {
          text: 'Eliminar',
          handler: async () => {
            this.userFire = await this.authService.getCurrentUserFire().toPromise()

                  let obs: Observable<any>;
                  obs = this.authService.deleteAccount(this.userFire.token);

                  obs.subscribe(
                    errorResponse => {
                      const code = errorResponse.error.error.message;
                      console.log(code)
                    }
                  )
                  this.usuarioService.deleteAcount(this.userFire.id)
                  this.authService.logout();
          },
          cssClass: 'alrtDanger'
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
      ]
    })
    .then(alertEl => alertEl.present());
  }

  async esContacto(perfil: string){
    let t = this;
    let lista = await this.usuarioService.getContactos(this.userFire.id, 10, null);
    console.log(lista);
    lista.forEach(function (a) {
      if(a.idPersona === perfil){
        t.textoBoton = "ELIMINAR CONTACTO";
        return true;
      }
    })
    return false;
  }

  async EsMiPerfil(){
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log(this.userFire.id);
    this.esMiPerfil = this.userFire.id === this.idPerfil;
    console.log(this.esMiPerfil);
    return this.esMiPerfil;
  }

  agregarContacto(){

    this.usuarioService.agregarContacto(this.userFire.id, this.idPerfil)
    this.textoBoton = 'PENDIENTE';

  }

  async obtenerPerfil(id: string){   
    await this.EsMiPerfil();

    this.loadingCtrl.create({ keyboardClose: true, message: 'Cargando...' }).then(loadingEl =>{
      loadingEl.present();
      this.loading = loadingEl;
      this.isLoading = true;
    });
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    if (this.loading != undefined) {
      this.loading.dismiss();
      this.isLoading = false;
    }
    this.perfilServ.usuarioDatos = this.perfil.usuario;
    this.publicaciones.next(this.perfil.publicaciones.reverse());
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);
    this.galleria.next(this.perfil.galerias);
    this.contactos = (await this.usuarioService.getAmigosAsync(id)).length;
  }

}
