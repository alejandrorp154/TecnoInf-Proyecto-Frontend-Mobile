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
  isLoading: Boolean = true;

  esMiPerfil: boolean;

  textoBoton = '';

  listaContactos = [];

  contactos: number;

  tieneSolPendiente: boolean;

  somosAmigos: boolean = false;

  constructor(
    private perfilServ: PerfilService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuarioService,
    public alertCtrl: AlertController
    )
    {
    }

  async ngOnInit() {
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
    this.listaContactos = await this.usuarioService.getContactos(this.userFire.id, 10, null);

    this.router.paramMap.subscribe(
      async params => {
        const id = params.get('id');
        this.obtenerPerfil(id.toString());
        this.idPerfil = id;
        //this.tieneSolicitudPendiente();
        await this.solPendiente();
        let contacto = this.esContacto(this.idPerfil);
        let esperfil = this.EsMiPerfil();
        this.esMiPerfil = esperfil;
        //let solicitudPendiente = this.tieneSolicitudPendiente();
        if(this.somosAmigos){
          console.log('tengo solicitudo pendiente de este contacto');
          this.textoBoton = 'PENDIENTE';
        }
        if(!esperfil && contacto){
          console.log('No es mi perfil pero si contacto');
          this.textoBoton = 'ELIMINAR CONTACTO';
        }
        if(!esperfil && !contacto && !this.somosAmigos){
          this.textoBoton = 'AGREGAR CONTACTO';
        }






      }
    );
  }




  esContacto(perfil: string){
    let lista = this.listaContactos;
    console.log(lista);
    var interesExiste = this.listaContactos.find(inte => {
      return inte.idPersona === perfil;
    });

    return interesExiste != null ? true : false;
  }

  EsMiPerfil(){
    let esMiPerfil: boolean;
    console.log('este es el logueado>' + this.userFire.id + ' este es el perfil al que entre> ' +this.idPerfil);

    if(this.userFire.id === this.idPerfil){
      esMiPerfil = true;
    }
    else{
      esMiPerfil = false;
    }
    console.log('es mi perfil', esMiPerfil);
    return esMiPerfil;
  }


  clickBoton(){
    let agrego: boolean = false;
    if(this.textoBoton === 'AGREGAR CONTACTO'){
      this.usuarioService.agregarContacto(this.userFire.id, this.idPerfil);
      this.textoBoton = 'PENDIENTE';
      agrego = true;
    }
    if(this.textoBoton === 'ELIMINAR CONTACTO'){
      this.usuarioService.bajaContacto(this.userFire.id, this.idPerfil);
      this.textoBoton = 'AGREGAR CONTACTO';
    }
    if(!agrego && this.textoBoton === 'PENDIENTE'){
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
                this.textoBoton = 'AGREGAR CONTACTO';
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
    });
    this.perfil = await this.perfilServ.obtenerPerfil(id); //Usuario por id
    if (this.loading != undefined) {
      this.loading.dismiss();
      this.isLoading = false;
    }
    this.perfilServ.usuarioDatos = this.perfil.usuario;
    this.publicaciones.next(this.perfil.publicaciones);
    this.usuario.next(this.perfil.usuario);
    this.medalla.next(this.perfil.usuario.medalla);
    this.galleria.next(this.perfil.galerias);
    this.contactos = (await this.usuarioService.getAmigosAsync(id)).length;
  }

  /*tieneSolicitudPendiente(){
    let solPendiente = this.solPendiente();
    console.log(this.userFire.id, this.idPerfil);

    return solPendiente;
  }
*/
  async solPendiente(){
    let sol: boolean;
    this.somosAmigos = await this.usuarioService.tieneSolicitudPendiente(this.userFire.id, this.idPerfil)
    console.log(this.somosAmigos);
    /*if(response){
      sol = true;
    }
    else{
      sol = false;
    }*/
    //this.tieneSolPendiente = this.somosAmigos;
    return this.somosAmigos;

  }

}
