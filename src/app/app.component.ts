import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { Usuario } from './modelos/usuario.model';
import { AuthService } from './servicios/auth.service';
import { Platform } from '@ionic/angular';
import { FirebaseApp } from '@angular/fire';
import '@firebase/messaging';
import { PerfilService } from './servicios/perfil.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  private authSub: Subscription;
  private previousAuthState = false;
  userApp: Usuario;


  constructor(private authService: AuthService, private router: Router, private firebase: FirebaseApp, private perfilService: PerfilService,
    public plt: Platform) {
  this.userApp = new Usuario("","", "","", "","","","", "","", "");

  }

  ngOnInit()
  {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onLogout()
  {
    this.authService.logout();
  }

  async goToGallery()
  {
    this.userApp = await this.authService.getCurrentUser().toPromise();
    this.router.navigateByUrl(`/galeria/${this.userApp.idPersona}`)
  }

  prueba() {
    console.log('prueba');
    const messaging = this.firebase.messaging();
    messaging.requestPermission().then(() => alert('Tienes permiso')).catch(err => alert('No tienes permiso'));
  }


}
