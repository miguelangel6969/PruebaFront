import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormsService } from 'src/app/core/services/forms.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id','num_documento','email','comentarios', 'fecha', 'id_marca', ' '];
  dataSource = new MatTableDataSource();
  
  constructor(private svForms : FormsService,private actRoute: ActivatedRoute, private router: Router ) { 
    
  }

  ngOnInit(): void {
    this.svForms.Forms().subscribe(resp => {
      console.log(resp);
      this.dataSource.data = resp;
    },err =>{
      console.log("resp error", err)
    });
  }
  
  
}
