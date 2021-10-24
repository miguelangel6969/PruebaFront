import { Marcas } from './../models/marcas.ts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from '../models/formularios';
import { User } from '../models/user';
import { environment } from '../../../environments/environment'
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http : HttpClient , private cs : ConfigService) { }

  Marcas(): Observable<Marcas[]>{
    return this.http.get<Marcas[]>(`${this.cs.base}marca/list`,this.cs.httpOptions);
  }
}
