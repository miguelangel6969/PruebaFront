//import { GlobalsUser } from './../../../core/globals/globalsUser';
import { sha256 } from 'js-sha256';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from './../../../core/models/user'
import { UserService } from 'src/app/core/services/UserService.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  expireEmail = ["","",""];
  contExpire = 0;
  constructor(private fb: FormBuilder , private LoginService : UserService , private router: Router) { 
    this.expireEmail[0]="";
    this.expireEmail[1]="";
    this.expireEmail[2]="";
    this.contExpire = 0;
  }

  ngOnInit(): void {
  }
  show = false;
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit (): void {
    if (this.form.valid) {
      const user = new User();
      user.email = this.form.value.email;
      user.password = sha256(this.form.value.password);
      this.LoginService.Login(user).subscribe(resp => {
        localStorage.setItem("idLog",resp.id);
        localStorage.setItem("emailLog",this.form.value.email);
        console.log(resp)
        if (resp.access === true) {
          this.contExpire = 0;
          this.router.navigateByUrl('/forms/formularios/list');
        }else{
          this.ban(this.form.value.email);
          console.log("No estas registrado")
        }
      },err =>{
        console.log("resp error", err)
      });
    }
  }

  registro():void{
    if (this.form.valid) {
      const user = new User();
      user.email = this.form.value.email;
      user.password = sha256(this.form.value.password);
      this.LoginService.Registro(user).subscribe(resp => {
        console.log("=>", resp)
      },err =>{
        console.log("resp error", err)
      });
    }
  }

  ban(email : any):void{
    if (this.contExpire == 3) {
      if (this.expireEmail[0] == this.expireEmail[1] && this.expireEmail[0] == this.expireEmail[2]) {
        console.log("este usuario sera bloqueado");
        this.expireEmail[0]="";
        this.expireEmail[1]="";
        this.expireEmail[2]="";
        this.contExpire = 0;
        this.LoginService.ban(email).subscribe(resp => {
        },err =>{
          console.log("resp error", err)
        });
      }
    }else{
      this.expireEmail[this.contExpire] = email;
      this.contExpire++;
      if (this.expireEmail[0] == this.expireEmail[1] && this.expireEmail[0] == this.expireEmail[2]) {
        console.log("este usuario sera bloqueado");
        this.expireEmail[0]="";
        this.expireEmail[1]="";
        this.expireEmail[2]="";
        this.contExpire = 0;
        this.LoginService.ban(email).subscribe(resp => {
        },err =>{
          console.log("resp error", err)
        });
      }
    }
  }
}

