import { Component, OnInit } from '@angular/core';
import { Interes } from '../modelos/interes.model';
import { InteresService } from '../servicios/interes.service';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../modelos/usuario.model';
import { Perfil } from '../modelos/perfil';
import { PerfilService } from '../servicios/perfil.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intereses-usuario-comun',
  templateUrl: './intereses-usuario-comun.page.html',
  styleUrls: ['./intereses-usuario-comun.page.scss'],
})
export class InteresesUsuarioComunPage implements OnInit {

  intereses: Interes[];
  currentUser: Usuario;
  perfilUser: Perfil;
  userIntereses: BehaviorSubject<Interes[]> = new BehaviorSubject([]);
  constructor(private interesesService: InteresService,
  private authService: AuthService,
  private perfilService: PerfilService) {
    this.intereses = [];
  }

  ngOnInit() {
    this.getAllIntereses();
    this.getLoguedUser()
  }

  onSubscribirse(idInteres: number, interes: Interes)
  {
    this.interesesService.subscribeInteres(idInteres, this.currentUser.idPersona)
    this.userIntereses.value.push(interes)

  }
  onDesSubscribirse(idInteres: number, interes: Interes)
  {
    this.interesesService.unSubscribeInteres(idInteres, this.currentUser.idPersona)
    let index = this.userIntereses.value.findIndex(x => x.idInteres == interes.idInteres)
    if (index > -1) {
      this.userIntereses.value.splice(index, 1);
    }
  }

  async getAllIntereses(){
    this.intereses = await this.interesesService.getAllInteresesAsync();
  }

  async getLoguedUser()
  {
    this.currentUser = await this.authService.getCurrentUser().toPromise();
    this.perfilUser = await this.perfilService.obtenerPerfil(this.currentUser.idPersona)
    this.userIntereses.next(this.perfilUser.intereses)
  }

  check(interes: Interes)
  {
    return this.userIntereses.value.some(i => i.idInteres == interes.idInteres)
  }
}
