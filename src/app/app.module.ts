import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInterceptorService } from './servicios/log-intercepetor.service';
import {DatePipe} from '@angular/common';
import { FormControl } from '@angular/forms';

export function getBaseUrl() {
  //console.log(document.getElementsByTagName('base')[0].href);
  return 'http://3.134.98.109:8080/pryectoBack-web/rest/';
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule, AngularFireStorageModule,
    FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptorService, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
