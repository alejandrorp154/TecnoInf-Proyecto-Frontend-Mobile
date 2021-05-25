import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canLoad: [LoginGuard]
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
    loadChildren: () => import('./UI/alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule),
    canLoad: [LoginGuard]

  },
  {
    path: 'baja-evento',
    loadChildren: () => import('./UI/baja-evento/baja-evento.module').then( m => m.BajaEventoPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./UI/chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./UI/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'chat/:nickname',
    loadChildren: () => import('./UI/chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [LoginGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
