import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { ListComponent } from './formularios/list/list.component';
import { EditComponent } from './formularios/edit/edit.component';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    AngularMaterialModule
  ]
})
export class FormsModule { 
  
}
