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
  },  {
    path: 'alta-evento',
    loadChildren: () => import('./UI/alta-evento/alta-evento.module').then( m => m.AltaEventoPageModule)
  },
  {
    path: 'baja-evento',
    loadChildren: () => import('./UI/baja-evento/baja-evento.module').then( m => m.BajaEventoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
