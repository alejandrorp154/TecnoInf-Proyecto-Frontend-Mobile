import { Component, OnInit } from '@angular/core';
import { Interes } from '../modelos/interes.model';
import { InteresService } from '../servicios/interes.service';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../modelos/usuario.model';

@Component({
  selector: 'app-intereses-usuario-comun',
  templateUrl: './intereses-usuario-comun.page.html',
  styleUrls: ['./intereses-usuario-comun.page.scss'],
})
export class InteresesUsuarioComunPage implements OnInit {

  intereses: Interes[];
  currentUser: Usuario;
  constructor(private interesesService: InteresService, private authService: AuthService) { }

  ngOnInit() {
    this.getAllIntereses();

  }

  onSubscribirse(idInteres: number)
  {
    this.interesesService.subscribeInteres(idInteres, this.currentUser.idPersona)
  }
  onDesSubscribirse(idInteres: number)
  {
    this.interesesService.unSubscribeInteres(idInteres, this.currentUser.idPersona)
  }

  async getAllIntereses(){
    this.intereses = await this.interesesService.getAllInteresesAsync();
  }

  async getLoguedUser()
  {
    this.currentUser = await this.authService.getCurrentUser().toPromise();
  }
}
