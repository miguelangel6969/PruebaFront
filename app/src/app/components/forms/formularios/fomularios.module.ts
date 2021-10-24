import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { FormulariosRoutingModule } from './formularios-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material.module';

@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class FormulariosModule { }
