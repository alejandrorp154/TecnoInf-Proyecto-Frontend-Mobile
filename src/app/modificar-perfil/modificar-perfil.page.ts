import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioPerfil } from '../modelos/perfil';
import { Usuario } from '../modelos/usuario.model';
import { PerfilService } from '../servicios/perfil.service';
import { Resultado, ToolsService } from '../servicios/tools.service';

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

  constructor(private router: Router, private perfilServ: PerfilService, private sanitizer: DomSanitizer, private tools: ToolsService) {
    this.usuario = new Usuario(perfilServ.usuarioDatos.idPersona,perfilServ.usuarioDatos.nickname,perfilServ.usuarioDatos.nombre,perfilServ.usuarioDatos.apellido ,perfilServ.usuarioDatos.celular ,perfilServ.usuarioDatos.direccion,perfilServ.usuarioDatos.email,perfilServ.usuarioDatos.pais,perfilServ.usuarioDatos.imagenPerfil,perfilServ.usuarioDatos.nombreImagen,perfilServ.usuarioDatos.extension);
    this.imageSource = this.usuario.imagenPerfil;
  }

  ngOnInit() {
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


}
