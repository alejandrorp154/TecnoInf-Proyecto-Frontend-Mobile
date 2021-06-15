import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService} from '../servicios/auth.service';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Persona, Rol } from '../modelos/persona.model';
import { Usuario } from '../modelos/usuario.model';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthResponseData } from '../modelos/AuthResponseData.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  isLoading = false;
  isLogin = false;
  private user: Usuario;

  imageResponse: any;

  imageSource;
  imagen = {
    base64: '../../assets/img/defaultProfileImage.png',
    nombre: 'defaultProfileImage',
    ext: 'png'
  }

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private plt: Platform) { }

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Conectandose...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            this.callBackend();

            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/home');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Hubo un error inesperado, intentelo nuevamente.';
            if (code === 'EMAIL_EXISTS') {
              message = 'Este correo ya se a registrado.';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'No se encontro el correo ingresado.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'La contraseña es incorrecta.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const usuario = new Usuario();
    usuario.apellido = form.value.apellido;
    usuario.nickname = form.value.nickname;
    usuario.nombre = form.value.nombre;
    usuario.celular = form.value.celular;
    usuario.direccion = form.value.direccion;
    usuario.email = form.value.email;

    this.user = usuario;

    //this.user = {idPersona: "", nickname: form.value.nickname, nombre: form.value.nombre, apellido: form.value.apellido,
      //celular: form.value.celular, email: form.value.email}

    console.log(form.value.nombre)

    this.authenticate(form.value.email, form.value.password);
    form.reset();

  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Fallo de autentificación',
        message: message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

  private callBackend()
  {
    this.authService.userID.pipe(take(1)).subscribe(userID =>
      {
        if(!userID)
        {
          throw new Error('No se encontro la ID del usuario.');
        }
        else
        {
           this.user.idPersona = userID;
        }
      });

      try {
        const url = `${this.baseUrl}usuario`;
        console.log(this.user);
        let response = this.httpClient.post(url, this.user).toPromise()
      } catch (error) {
        console.log(error);
      }
  }


  async selectImageSource() {

    if (this.plt.is('android')) {
      // const buttons = [
      //   {
      //     text: 'Take Photo',
      //     icon: 'camera',
      //     handler: () => {
      //       this.addImage(CameraSource.Camera);
      //     }
      //   },
      //   {
      //     text: 'Choose From Photos Photo',
      //     icon: 'image',
      //     handler: () => {
      //       this.addImage(CameraSource.Photos);
      //     }
      //   }
      // ];

      // const actionSheet = await this.actionSheetCtrl.create({
      //   header: 'Select Image Source',
      //   buttons
      // });
      // await actionSheet.present();
    }
    else{
      this.fileInput.nativeElement.click();
    }
  }

  // manejo de imagenes
  uploadFile(event) {
    console.log(this.imageSource)
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img: string | ArrayBuffer = reader.result as string;
      this.imagen.base64 = img;
      this.imagen.nombre = file.name;
      this.imagen.ext = file.type;
      let base64 = [];
      base64 = img.split(',');
     this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${base64[0]}, ${base64[1]}`);
    };
  }

  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  cancelar()
  {

  }
}



