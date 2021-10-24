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
    return this.http.post(`${this.cs.base}login`, user,this.cs.httpOptions)
  }

  Registro(user: User): Observable<any> {
    return this.http.post(`${this.cs.base}ins`, user,this.cs.httpOptions)
  }

  ban (email : any):Observable<any>{
    return this.http.post(`${this.cs.base}ban`,email,this.cs.httpOptions)
  }
  
}

 