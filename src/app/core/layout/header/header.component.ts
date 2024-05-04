import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IsUserLoggedInService, LocalStorageService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private isUserLoggedInService: IsUserLoggedInService,
    private translateService: TranslateService,
    private renderer: Renderer2
  ) {}
  /**
   * This is the onLogout function which handle logout by removing ['token'] from localStorage
   */
  onLogout() {
    this.localStorageService.remove('token');
    this.isUserLoggedInService.isLoggedIn.next(false);
    this.router.navigate(['/auth/login']);
  }
  /**
   * This is the changeLanguage() function
   */
  changeLanguage(lang: string) {
    let dir = 'ltr';
    if (lang == 'ar') {
      dir = 'rtl';
    }
    this.renderer.setAttribute(document.body, 'dir', dir);
    this.translateService.use(lang);
    this.localStorageService.set('lang', lang);
  }
}
