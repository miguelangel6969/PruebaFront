import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './formularios/edit/edit.component'
import { ListComponent } from './formularios/list/list.component'
const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'formularios',
    loadChildren: () => import('./formularios/fomularios.module').then(m => m.FormulariosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
