import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment'
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient , private cs : ConfigService) { }

  
  Users():Observable<User[]>{
      return this.http.get<User[]>(`${this.cs.base}list`,this.cs.httpOptions);
  }
  
  Login(user: User): Observable<any> {
    return this.http.post(`${this.cs.base}login`,user,this.cs.httpOptions).pipe(
      map((resp:any)=>{
        if(resp.access){
          localStorage.clear();
          localStorage.setItem('token',resp.access);
          return resp;
        }
      }))
  }

  Registro(user: User): Observable<any> {
    return this.http.post(`${this.cs.base}ins`, user,this.cs.httpOptions)
  }

  ban (user : User):Observable<any>{
    return this.http.post(`${this.cs.base}ban`,user,this.cs.httpOptions)
  }

  Auth(id: any): Observable<any> {
    return this.http.get<any>(`${this.cs.base}auth/` +id,this.cs.httpOptions);
  } 

  isAuthenticate():boolean{
    const token = localStorage.getItem('token');
    if(token!=null && token!=''){
      return true;
    }else{
      return false
    }
  }
}

 