import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    }),
    params: undefined
  };

  constructor() {
  }

  base = environment.apiEndpoint;

}
