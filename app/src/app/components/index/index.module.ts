import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../../core/modules/angular-material.module";
import { ReactiveFormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      IndexRoutingModule,
      AngularMaterialModule,
      ReactiveFormsModule,
    ]
  })
  export class IndexModule {
}