import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { Usuario } from './modelos/usuario.model';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  private authSub: Subscription;
  private previousAuthState = false;
  userApp: Usuario;


  constructor(private authService: AuthService, private router: Router) {
  this.userApp = new Usuario("","", "","", "","","","", "","", "")
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
}
