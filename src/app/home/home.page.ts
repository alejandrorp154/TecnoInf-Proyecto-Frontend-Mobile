import { UsuarioService } from "src/app/servicios/usuario.service";
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Usuario } from '../modelos/usuario.model';
import { UserFire } from '../modelos/userFire.model';
import { AuthService } from '../servicios/auth.service';
import { SugerirAmigosService } from '../servicios/sugerir-amigos.service';
import { Subscription } from "rxjs";
import { FeedHomeComponent } from "../UI/feed-home/feed-home.component";
import { PublicacionPerfilUsuario } from "../modelos/perfil";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  userFire: UserFire;
  public amigos: Usuario[];
  subscription: Subscription;
  nuevaPubli: PublicacionPerfilUsuario;

  constructor(private router: Router, private authService: AuthService, private sugerirAmigos: SugerirAmigosService, private userService: UsuarioService) {}

  async ngOnInit() {
    console.log('ngOnInit(Home)');
    this.authService.cerrarSesion.subscribe(res => { if(res > 0) this.ngOnDestroy() });
    setTimeout(() => this.delayCall(), 5);
  }

  nuevaPub(pub: PublicacionPerfilUsuario){
    this.nuevaPubli = pub;
    console.log('home nueva pub');
  }

  async delayCall()
  {
    this.userFire = await this.authService.getCurrentUserFire().toPromise()
    this.getSugerirAmigos()
  }

  async getSugerirAmigos(event?)
  {
    this.amigos = await this.sugerirAmigos.getUsuariosSugeridosAsync(this.userFire.id, 3, event);
  }

  onShowAllSuggested()
  {
    this.router.navigateByUrl('/sugerir-amigos');

  }

  ionViewDidEnter(){
   this.userService.getSolicitudesPendientes(this.userFire.id);
  }

  ngOnDestroy() {
    console.log('***** ngOnDestroy(Home) *****');
    //this.authService.cerrarSesion.unsubscribe();
  }
}
