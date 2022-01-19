import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './backend/models/language.model';
import { LocalStorageService } from './backend/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appDir: string;

  private language: Language;

  constructor(
    private translate: TranslateService,
    private storage: LocalStorageService
  ) {
    this.translate.onLangChange.subscribe(response => {
      this.storage.setString('lang', response.lang);
      this.appDir = response.lang === 'en' ? 'ltr' : 'rtl';
      document.dir = this.appDir;
      if (response.lang === 'en') {
        document.documentElement.style.setProperty('--ion-font-family', 'Lato, sans-serif');
      } else {
        document.documentElement.style.setProperty('--ion-font-family', 'Rudaw');
      }
    });

    this.initTranslate(this.storage.getString('lang') as Language);
    document.documentElement.style.setProperty('--ion-font-family', 'Opensans regular');

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.onresize = () => {
      // We execute the same script as before
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  }


  //#endregion
  initTranslate(language: Language) {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'en';
    }
    this.translateLanguage();
  }

  translateLanguage(): void {
    this.translate.use(this.language);
  }



  //#region Functions

  //#endregion

}
