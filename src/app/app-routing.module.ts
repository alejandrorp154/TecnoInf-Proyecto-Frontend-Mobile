import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { ConfiguracionNotificacionesPageModule } from './UI/configuracion-notificaciones/configuracion-notificaciones.module';

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
    path: 'evento',
    loadChildren: () => import('./alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'alta-evento',
    loadChildren: () => import('./alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'editar-evento',
    loadChildren: () => import('./alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule),
    canLoad: [LoginGuard]
  },
  // {
  //   path: 'baja-evento',
  //   loadChildren: () => import('./baja-evento/baja-evento.module').then( m => m.BajaEventoPageModule),
  //   canLoad: [LoginGuard]
  // },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule),
    canLoad: [LoginGuard]
    // canLoad: [LoginGuard]
  },
  {
    path: 'interes',
    loadChildren: () => import('./interes/interes.module').then( m => m.InteresPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'visualizar-ubicaciones/:id',
    loadChildren: () => import('./visualizar-ubicaciones/visualizar-ubicaciones.module').then( m => m.VisualizarUbicacionesPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'alta-administrador',
    loadChildren: () => import('./alta-administrador/alta-administrador.module').then( m => m.AltaAdministradorPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'sugerir-amigos',
    loadChildren: () => import('./UI/sugerir-amigos/sugerir-amigos.module').then( m => m.SugerirAmigosPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./admin-page/admin-page.module').then( m => m.AdminPagePageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'tab-medallas',
    loadChildren: () => import('./tab-medallas/tab-medallas.module').then( m => m.TabMedallasPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'tab-gestion-usuarios',
    loadChildren: () => import('./tab-gestion-usuarios/tab-gestion-usuarios.module').then( m => m.TabGestionUsuariosPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'listar-contactos',
    loadChildren: () => import('./listar-contactos/listar-contactos.module').then( m => m.ListarContactosPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'intereses-usuario-comun',
    loadChildren: () => import('./intereses-usuario-comun/intereses-usuario-comun.module').then( m => m.InteresesUsuarioComunPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'visualizar-contactos',
    loadChildren: () => import('./UI/visualizar-contactos/visualizar-contactos.module').then( m => m.VisualizarContactosPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'tab-perfil-admin',
    loadChildren: () => import('./tab-perfil-admin/tab-perfil-admin.module').then( m => m.TabPerfilAdminPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'comentarios-publicacion/:id',
    loadChildren: () => import('./comentarios-publicacion/comentarios-publicacion.module').then( m => m.ComentariosPublicacionPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'configuracion-notificaciones',
    loadChildren: () => import('./UI/configuracion-notificaciones/configuracion-notificaciones.module').then(c => c.ConfiguracionNotificacionesPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'solicitudes-pendientes',
    loadChildren: () => import('./UI/solicitudes-pendientes/solicitudes-pendientes.module').then( m => m.SolicitudesPendientesPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'galeria/:id',
    loadChildren: () => import('./galeria/galeria.module').then( m => m.GaleriaPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'galeria-modal',
    loadChildren: () => import('./galeria-modal/galeria-modal.module').then( m => m.GaleriaModalPageModule),
    canLoad: [LoginGuard]

  },
  {
    path: 'tab-email-notificacion',
    loadChildren: () => import('./UI/tab-email-notificacion/tab-email-notificacion.module').then( m => m.TabEmailNotificacionPageModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'tab-push-notificacion',
    loadChildren: () => import('./UI/tab-push-notificacion/tab-push-notificacion.module').then( m => m.TabPushNotificacionPageModule),
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
