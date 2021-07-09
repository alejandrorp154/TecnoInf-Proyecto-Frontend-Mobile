import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';
import { Usuario } from './modelos/usuario.model';
import { AuthService } from './servicios/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
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
    private fcm: FCM, public plt: Platform) {
  this.userApp = new Usuario("","", "","", "","","","", "","", "");
  this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
  }
/*
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

*/
  ngOnInit()
  {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
/*
    console.log(this.firebase);
    const messaging = this.firebase.messaging();
    messaging.requestPermission().then(() => alert('Tienes permiso')).catch(err => alert('No tienes permiso'));
/
    this.fcm.subscribeToTopic('marketing');

    this.fcm.getToken().then(token => {
      backend.registerToken(token);
    });

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      backend.registerToken(token);
    });

    this.fcm.hasPermission().then(hasPermission => {
      if (hasPermission) {
        console.log("Has permission!");
      }
    })

    this.fcm.clearAllNotifications();

    this.fcm.unsubscribeFromTopic('marketing');*/
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
