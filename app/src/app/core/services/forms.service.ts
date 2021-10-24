import { Formulario } from './../models/formularios';
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
export class FormsService {

  constructor(private http : HttpClient , private cs : ConfigService) { }

  Forms():Observable<Formulario[]>{
    return this.http.get<Formulario[]>(`${this.cs.base}forms/list`,this.cs.httpOptions);
  } 
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.cs.base}forms/eli/` + id,this.cs.httpOptions);
  } 
  Registro(Formulario: Formulario): Observable<any> {
    return this.http.post(`${this.cs.base}forms/ins`,Formulario,this.cs.httpOptions)
  }
}
