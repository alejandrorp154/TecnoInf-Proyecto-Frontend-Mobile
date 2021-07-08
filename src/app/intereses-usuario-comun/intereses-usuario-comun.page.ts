import { Component, OnInit } from '@angular/core';
import { Interes } from '../modelos/interes.model';
import { InteresService } from '../servicios/interes.service';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../modelos/usuario.model';
import { Perfil } from '../modelos/perfil';
import { PerfilService } from '../servicios/perfil.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InteresUsuario } from '../modelos/interesUsuario.model';

@Component({
  selector: 'app-intereses-usuario-comun',
  templateUrl: './intereses-usuario-comun.page.html',
  styleUrls: ['./intereses-usuario-comun.page.scss'],
})
export class InteresesUsuarioComunPage implements OnInit {

  intereses: BehaviorSubject<InteresUsuario[]> = new BehaviorSubject([]);;
  currentUser: Usuario;
  perfilUser: Perfil;
  userIntereses: BehaviorSubject<Interes[]> = new BehaviorSubject([]);
  constructor(private interesesService: InteresService,
  private authService: AuthService) {
  }

  ngOnInit() {
    this.getInteresesByUser();
  }

  onSubscribirse(idInteres: number, interes: InteresUsuario)
  {
    this.interesesService.subscribeInteres(idInteres, this.currentUser.idPersona)
    let index = this.intereses.value.findIndex(x => x.idInteres == interes.idInteres)
    this.intereses.value[index].estaSuscripto = true;
  }
  onDesSubscribirse(idInteres: number, interes: InteresUsuario)
  {
    this.interesesService.unSubscribeInteres(idInteres, this.currentUser.idPersona)
    let index = this.intereses.value.findIndex(x => x.idInteres == interes.idInteres)
    this.intereses.value[index].estaSuscripto = false;
  }

  async getInteresesByUser(){
    this.currentUser = await this.authService.getCurrentUser().toPromise();
    this.intereses.next(await this.interesesService.getInteresesByUser(this.currentUser.idPersona));
  }

  check(interes: Interes)
  {
    return this.userIntereses.value.some(i => i.idInteres == interes.idInteres)
  }
}
