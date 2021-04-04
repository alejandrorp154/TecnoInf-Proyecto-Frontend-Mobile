import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../shared/models/usuario';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  usuario;
  frmRegistro: FormGroup;

  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit() {}

  onSubmit(nickname, passphrase) {
    console.log("Realizará el registro.");
    this.usuario.nickname = nickname;
    this.usuario.passphrase = passphrase;
    console.log(this.usuario);
  }


}
