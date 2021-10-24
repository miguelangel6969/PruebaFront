import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormsService } from 'src/app/core/services/forms.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Formulario } from 'src/app/core/models/formularios';
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
  constructor(private svForms : FormsService,private actRoute: ActivatedRoute, private router: Router ) { 
    
  }

  ngOnInit(): void {
    this.svForms.Forms().subscribe(resp => {  
      this.dataSource.data = resp;
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
  
  
}
