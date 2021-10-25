import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIC';
  constructor(private router: Router ) { 
  }
  @HostListener('window:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:keydown')
  @HostListener('document:click') refreshUserState() {
    if(localStorage.getItem('token')){
      clearTimeout(this.userActivity);
      this.setTimeout();
    }
  }

  userActivity : any;
  userInactive: Subject<any> = new Subject(); 
  ngOnInit(): void {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      this.router.navigateByUrl('/login')
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 60000);
  }
}
