import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { UserService } from '../services/UserService.service';

@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate, CanActivateChild {

  constructor(private router: Router , private svLogin : UserService) {
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.svLogin.isAuthenticate()){
      return true;
    }else{
      this.router.navigateByUrl('/login')
      return false;
    }
   }
 
   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if(this.svLogin.isAuthenticate()){
         return true
       }else{
         this.router.navigateByUrl('/login')
         return false;
       }
   }
}