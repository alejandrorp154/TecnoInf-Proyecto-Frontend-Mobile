import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UsuarioPerfil } from '../modelos/perfil';
import { UserFire } from '../modelos/userFire.model';
import { Usuario } from '../modelos/usuario.model';
import { AuthService } from '../servicios/auth.service';
import { PerfilService } from '../servicios/perfil.service';
import { Resultado, ToolsService } from '../servicios/tools.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  usuario: Usuario;
  usuarioPerfil: UsuarioPerfil;
  resultado: Resultado
  imageSource;
  imagen = {
    base64: '',
    nombre: '',
    ext: ''
  }
  userFire: UserFire;

  constructor(private router: Router, private perfilServ: PerfilService, private sanitizer: DomSanitizer,
     private tools: ToolsService, private alertCtrl: AlertController,private authService: AuthService,
     private usuarioService: UsuarioService) {
    this.usuario = new Usuario(perfilServ.usuarioDatos.idPersona,perfilServ.usuarioDatos.nickname,perfilServ.usuarioDatos.nombre,perfilServ.usuarioDatos.apellido ,perfilServ.usuarioDatos.celular ,perfilServ.usuarioDatos.direccion,perfilServ.usuarioDatos.email,perfilServ.usuarioDatos.pais,perfilServ.usuarioDatos.imagenPerfil,perfilServ.usuarioDatos.nombreImagen,perfilServ.usuarioDatos.extension);
    this.imageSource = this.usuario.imagenPerfil;
  }

  async ngOnInit() {
    this.userFire = await this.authService.getCurrentUserFire().toPromise();
  }

  onSubmit(form: NgForm) {
    this.usuarioPerfil = new UsuarioPerfil();
    this.usuarioPerfil.idPersona = this.perfilServ.usuarioDatos.idPersona;
    this.usuarioPerfil.nombre = form.value.nombre;
    this.usuarioPerfil.apellido = form.value.apellido;
    this.usuarioPerfil.nickname = form.value.nickname;
    this.usuarioPerfil.email = form.value.email;
    this.usuarioPerfil.direccion = form.value.direccion;
    this.usuarioPerfil.celular = form.value.celular;
    this.usuarioPerfil.pais = form.value.pais;

    //this.usuario = form.value;
    if (this.imagen.base64 !='') {
      this.usuarioPerfil.imagenPerfil = this.imagen.base64;
      this.usuarioPerfil.nombreImagen = this.imagen.nombre;
      this.usuarioPerfil.extensionImagen = this.imagen.ext;
    }
    else {
      this.usuarioPerfil.imagenPerfil = this.usuario.imagenPerfil;
      this.usuarioPerfil.nombreImagen = this.usuario.nombreImagen;
      this.usuarioPerfil.extensionImagen = this.usuario.extension;
    }

    this.perfilServ.modificarPerfil(this.usuarioPerfil);
    this.tools.presentToast('El perfil fue modificado con exito', this.resultado).then(()=>this.router.navigate(['/home']))
  }

  async selectImageSource() {

    this.fileInput.nativeElement.click();

  }

  uploadFile(event) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img: string | ArrayBuffer = reader.result as string;
      this.imagen.base64 = img; //base64 mando
      this.imagen.nombre = file.name;//nombre mando
      this.imagen.ext = file.type;//extencion mando
      let base64 = [];
      base64 = img.split(',');
     this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${base64[0]}, ${base64[1]}`);
    };
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


}
