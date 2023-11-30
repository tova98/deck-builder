import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from './service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  faCaretDown = faCaretDown;

  title = 'DeckBuilder';

  @ViewChild('sidenav') sidenav: any;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        this.sidenav.close();
      }
    })
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
  }

  @HostListener('window:resize', ['event'])
  onResize() {
    this.sidenav.close();
  }
}
