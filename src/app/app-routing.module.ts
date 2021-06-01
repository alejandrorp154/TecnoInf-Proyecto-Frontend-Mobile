import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'alta-evento',
    loadChildren: () => import('./UI/alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule)
  },
  {
    path: 'baja-evento',
    loadChildren: () => import('./UI/baja-evento/baja-evento.module').then( m => m.BajaEventoPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./UI/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./UI/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'chat/:nickname',
    loadChildren: () => import('./UI/chat/chat.module').then( m => m.ChatPageModule)
  },  {
    path: 'interes',
    loadChildren: () => import('./UI/interes/interes.module').then( m => m.InteresPageModule)
  },
  {
    path: 'sugerir-amigos',
    loadChildren: () => import('./UI/sugerir-amigos/sugerir-amigos.module').then( m => m.SugerirAmigosPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
