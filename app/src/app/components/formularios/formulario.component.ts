import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormsService } from 'src/app/core/services/forms.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Formulario } from 'src/app/core/models/formularios';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './formularios.html'
})
export class FormulariosComponent {
  
  constructor(private router: Router ) { 
  }
  
}
