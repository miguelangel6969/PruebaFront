import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guard } from './core/guards/guard.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    loadChildren: () => import('./components/index/index.module').then(m => m.IndexModule)
  },
  { 
    canActivate: [Guard],
    canActivateChild: [Guard],
    path: 'formularios', 
    loadChildren: () => import('./components/formularios/fomularios.module').then(m => m.FormulariosModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
