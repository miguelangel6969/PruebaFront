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

  constructor(private fb: FormBuilder , private LoginService : UserService , private router: Router) { }

  ngOnInit(): void {
  }
  show = false;
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.valid) {
      const user = new User();
      user.email = this.form.value.email;
      user.password = sha256(this.form.value.password);
      this.LoginService.Login(user).subscribe(resp => {
        localStorage.setItem("idLog",resp.id);
        localStorage.setItem("emailLog",this.form.value.email);
        console.log(localStorage.getItem("emailLog"));
        this.router.navigateByUrl('/forms/formularios/list');
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
}
