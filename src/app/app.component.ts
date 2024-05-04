import { Component, OnInit, Renderer2 } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IsUserLoggedInService, LocalStorageService } from './core';
import { User } from './features/authentication/models/user';
import { AuthenticationService } from './features/authentication/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  direction = 'ltr';
  constructor(
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private isUserLoggedInService: IsUserLoggedInService,
    private translateService: TranslateService,
    private renderer: Renderer2
  ) {
    this.translateService.addLangs(['en', 'ar']);   
    let currentLang = 'en';
    if (this.localStorageService.get('lang')){
      currentLang = this.localStorageService.get('lang');
    }      
    this.changeLanguage(currentLang);
  }

  ngOnInit(): void {
    this.isUserLoggedInService.isLoggedIn.subscribe((value: any) => {
      this.isUserLoggedIn = value;
    });
    const token = this.localStorageService.get('token');
    if (token) {
      this.isUserLoggedIn = true;
    }
  }

  changeLanguage(lang: string) {
    let dir = 'ltr';
    if (lang == 'ar') {
      dir = 'rtl';
    }
    this.renderer.setAttribute(document.body, 'dir', dir);
    this.localStorageService.set('lang', lang);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }
}
