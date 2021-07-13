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
import { estadosContactos } from "../modelos/estadosContactos.enum";
import { EstadosContactos } from "../modelos/contacto.model";

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


  textoBoton = '';

  listaContactos = [];

  contactos: number;

  constructor(
    private perfilServ: PerfilService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuarioService
    )
    {
    }

  async ngOnInit() {
    console.log('es mi perfil al principio de ngonInit', this.esMiPerfil);
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    this.listaContactos = await this.usuarioService.getContactos(this.userFire.id, 10, null);
    this.router.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.obtenerPerfil(id.toString());
        this.idPerfil = id;
        let contacto = this.esContacto(this.idPerfil);
        let esperfil = this.EsMiPerfil();
        console.log('es contacto', contacto);
        if(esperfil && contacto){
          this.textoBoton = 'ELIMINAR CONTACTO';
        }
        else if(this.tieneSolicitudPendiente()){
          this.textoBoton = 'PENDIENTE';
        }
        else{
          this.textoBoton = 'AGREGAR CONTACTO';
        }
      }
    );
    console.log('es mi perfil al final de ngonInit', this.esMiPerfil);
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


  esContacto(perfil: string){
    console.log('me fijo si este perfil es mi contacto', perfil);
    let lista = this.listaContactos;
    console.log(lista);
    var interesExiste = this.listaContactos.find(inte => {
      return inte.idPersona === perfil;
    });

    return interesExiste != null ? true : false;
  }

  async EsMiPerfil(){
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    console.log('este es el logueado>' + this.userFire.id + ' este es el perfil al que entre> ' +this.idPerfil);

    this.esMiPerfil = this.userFire.id === this.idPerfil;
    console.log('es mi perfil', this.esMiPerfil);
    return this.esMiPerfil;
  }

  clickBoton(){

    if(this.textoBoton === 'AGREGAR CONTACTO'){
      this.usuarioService.agregarContacto(this.userFire.id, this.idPerfil);
      this.textoBoton = 'PENDIENTE';
    }
    if(this.textoBoton === 'ELIMINAR CONTACTO'){
      this.usuarioService.bajaContacto(this.userFire.id, this.idPerfil);
      this.textoBoton = 'AGREGAR CONTACTO';
    }
    if(this.textoBoton === 'PENDIENTE'){
      try{
        this.alertCtrl
        .create({
          header: 'Cancelar Solicitud',
          message: '¿Estas seguro que deseas cancelar la solicitud de contacto?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Continuar',
              handler: async () => {
                this.usuarioService.respuestaContacto(this.userFire.id, this.idPerfil, EstadosContactos.cancelada);
              }
            }
          ]
        })
        .then(alertEl => {
          alertEl.present();
        });
      }catch(error){
        console.log(error);
      }
    }
    //if es pendiente que muestre un alert para cancelar la solicitud



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

  async tieneSolicitudPendiente(){
    console.log(this.userFire.id, this.idPerfil);
    let response = await this.usuarioService.tieneSolicitudPendiente(this.userFire.id, this.idPerfil);
    console.log('sol pendiente',response);
    return response;
  }

}
