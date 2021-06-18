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
    path: 'perfil/:id',
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
    loadChildren: () => import('./alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule),
    canLoad: [LoginGuard]

  },
  {
    path: 'baja-evento',
    loadChildren: () => import('./baja-evento/baja-evento.module').then( m => m.BajaEventoPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
    // canLoad: [LoginGuard]
  },
  {
    path: 'chat/:nickname',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'interes',
    loadChildren: () => import('./interes/interes.module').then( m => m.InteresPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'visualizar-ubicaciones',
    loadChildren: () => import('./visualizar-ubicaciones/visualizar-ubicaciones.module').then( m => m.VisualizarUbicacionesPageModule)
  },
  {
    path: 'alta-administrador',
    loadChildren: () => import('./alta-administrador/alta-administrador.module').then( m => m.AltaAdministradorPageModule)
  },
  {
    path: 'mod-administrador',
    loadChildren: () => import('./mod-administrador/mod-administrador.module').then( m => m.ModAdministradorPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'sugerir-amigos',
    loadChildren: () => import('./UI/sugerir-amigos/sugerir-amigos.module').then( m => m.SugerirAmigosPageModule)
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'tab-medallas',
    loadChildren: () => import('./tab-medallas/tab-medallas.module').then( m => m.TabMedallasPageModule)
  },
  {
    path: 'tab-gestion-usuarios',
    loadChildren: () => import('./tab-gestion-usuarios/tab-gestion-usuarios.module').then( m => m.TabGestionUsuariosPageModule)
  },
  {
    path: 'visualizar-contactos',
    loadChildren: () => import('./UI/visualizar-contactos/visualizar-contactos.module').then( m => m.VisualizarContactosPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
