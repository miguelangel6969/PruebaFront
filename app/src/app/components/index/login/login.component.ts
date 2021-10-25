import { User } from './../../../core/models/user';
//import { GlobalsUser } from './../../../core/globals/globalsUser';
import { sha256 } from 'js-sha256';
import { Component, HostListener, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/core/services/UserService.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  expireEmail = ["","",""];
  contExpire = 0;
  ins = true;
  constructor(private fb: FormBuilder , private LoginService : UserService , private router: Router) { 
    this.expireEmail[0]="";
    this.expireEmail[1]="";
    this.expireEmail[2]="";
    this.contExpire = 0;
    localStorage.clear();
  }

  ngOnInit(): void {
  }
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit (): void {
    if (this.form.valid && this.validate) {
      const user = new User();
      user.email = this.form.value.email;
      user.password = sha256(this.form.value.password);
      this.LoginService.Login(user).subscribe(resp => {
        if (resp != undefined && resp.access == true) {
          this.contExpire = 0;
          localStorage.setItem("idLog",resp.id);
          localStorage.setItem("emailLog",this.form.value.email);
          localStorage.setItem("access",resp.access);
          this.router.navigateByUrl('/formularios/list');
        }else{
          Swal.fire({
            title: 'Login failed',
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver a intentar'
          })
          this.ban(user);
        }
      },err =>{
        Swal.fire({
          title: 'Login failed',
          icon: 'warning',
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver a intentar'
        })
        console.log("resp error", err)
      });
    }
  }
  validate():boolean{
    let email = this.form.value.email;
    console.log("esto es ============== >" , email.includes('@'))
    return email.includes('@');
  }

  registro():void{
    if (this.form.valid && this.validate) {
      const user = new User();
      user.email = this.form.value.email;
      user.password = sha256(this.form.value.password);
      this.LoginService.Registro(user).subscribe(resp => {
      },err =>{
        console.log("resp error", err)
      });
    }
  }

  ban(UserBan : User) : void{
    if (this.contExpire == 3) {
      if (this.expireEmail[0] == this.expireEmail[1] && this.expireEmail[0] == this.expireEmail[2]) {
        Swal.close();
        Swal.fire({
          title: 'Login failed',
          icon: 'warning',
          text: "Este usuario fue bloqueado por 3 intentos erroneos",
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ok'
        })

        this.expireEmail[0]="";
        this.expireEmail[1]="";
        this.expireEmail[2]="";
        this.contExpire = 0;
        this.LoginService.ban(UserBan).subscribe(resp => {
        },err =>{
          console.log("resp error", err)
        });
      }
    }else{
      this.expireEmail[this.contExpire] = UserBan.email;
      this.contExpire++;
      if (this.expireEmail[0] == this.expireEmail[1] && this.expireEmail[0] == this.expireEmail[2]) {
        Swal.close();
        Swal.fire({
          title: 'Login failed',
          icon: 'warning',
          text: "Este usuario fue bloqueado por 3 intentos erroneos",
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ok'
        })
        this.expireEmail[0]="";
        this.expireEmail[1]="";
        this.expireEmail[2]="";
        this.contExpire = 0;
        this.LoginService.ban(UserBan).subscribe(resp => {
        },err =>{
          console.log("resp error", err)
        });
      }
    }
  }
  
}


