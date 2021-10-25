import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormsService } from 'src/app/core/services/forms.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Formulario } from 'src/app/core/models/formularios';
import { Marcas } from 'src/app/core/models/marcas.ts';
import { MarcaService } from 'src/app/core/services/marca.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id','num_documento','email','comentarios', 'fecha', 'id_marca', ' '];
  dataSource = new MatTableDataSource();
  dataSourcefilter = new MatTableDataSource();
  formulario :any  = [];
  marca !: Marcas [] ;
  constructor(private svMarcas : MarcaService ,private svForms : FormsService,private actRoute: ActivatedRoute, private router: Router ) { 
    this.svForms.Forms().subscribe(resp => {  
      this.dataSource.data = resp;
      this.svMarcas.Marcas().subscribe(resp => {
        console.log(resp)
        this.marca = resp;
      });
      resp.forEach(element => {
        if (element.id_login == Number(localStorage.getItem("idLog"))) {
            this.formulario.push(element);
        }
      });
      
      this.dataSourcefilter.data = this.formulario;
    },err =>{
      console.log("resp error", err)
    });
  }

  ngOnInit(): void {
    
  }
  
  
}
