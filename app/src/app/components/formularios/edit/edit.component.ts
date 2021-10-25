import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Formulario } from 'src/app/core/models/formularios';
import { Marcas } from 'src/app/core/models/marcas.ts';
import { FormsService } from 'src/app/core/services/forms.service';
import { MarcaService } from 'src/app/core/services/marca.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  marcas !: Marcas [] ;
  Fecha = "";
  delete : boolean = false;
  id : any;
  formul !: Formulario;
  eliminar = false;

  form: FormGroup = this.fb.group({
    comentarios: ["", Validators.required],
    numDoc: ["", Validators.required],
    marca: ["", Validators.required]
  });
  constructor(private svForms : FormsService,private actRoute: ActivatedRoute,private fb: FormBuilder, private svMarcas : MarcaService , private svFormularios : FormsService, private router: Router) { 
    this.id = this.actRoute.snapshot.params.id;
    this.svForms.Forms().subscribe(resp => {  
      resp.forEach(element => {
        if (element.id == this.id) {
          this.formul = element;
          this.eliminar = true;
          this.setInitForm();
        }
      });
    },err =>{
      console.log("resp error", err)
    });
  }

  ngOnInit(): void {
    this.svMarcas.Marcas().subscribe(resp => {
      console.log(resp)
      this.marcas = resp;
    },err =>{
      console.log("resp error", err)
    });
  }
  submit():void {
    if(!this.eliminar){
      if (this.form.valid) {
        const formu = new Formulario();
        let date: Date = new Date();
        let cadena = String(date);
        formu.fecha = cadena.substr(0,24)
        formu.num_documento = this.form.value.numDoc;
        formu.comentarios = this.form.value.comentarios;
        formu.id_marca = this.form.value.marca;
        formu.id_login = Number(localStorage.getItem("idLog"));
        formu.email = String(localStorage.getItem("emailLog"));
        
        this.svFormularios.Registro(formu).subscribe(resp => {
          this.router.navigateByUrl("/formularios/list");
        },err =>{
          console.log("resp error", err)
        });
      }else{
        console.log("Digite bien los datos")
      }
    }else if(this.eliminar){
      this.Delete(this.id);
    }
  }
  
  Delete(id : any):void {
    this.svForms.delete(id).subscribe(resp => {
      this.router.navigateByUrl("/formularios/list");
    },err =>{
      console.log("resp error", err)
    });
  }

  get fc() {
    return this.form.controls;
  }

  setInitForm() {
    this.fc.comentarios.setValue(this.formul.comentarios);
    this.fc.numDoc.setValue(this.formul.num_documento);
    this.fc.marca.setValue(this.formul.id_marca);
  }
}


