import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language } from 'src/app/backend/models/language.model';
import { Location } from 'src/app/backend/models/location.model';
import { AuthService } from 'src/app/backend/services/auth.service';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { SettingsService } from 'src/app/backend/services/settings.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';
import { SelectLocationComponent } from '../../pages/select-location/select-location.component';
import { MessagingService } from '../../services/messaging.service';
import { AboutContactComponent } from '../about-contact/about-contact.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.page.html',
  styleUrls: ['./side-nav.page.scss'],
})
export class SideNavPage implements OnInit, OnDestroy {

  //#region  Fields
  expanded = false;
  languageExpanded = false;
  selectedLocation: Location | undefined = this.storage.getObject('location') ?? undefined;
  selectedLang: Language | undefined = this.storage.getString('lang') as Language ?? undefined;



  private _settings: any;
  private _locations: Location[] | undefined;
  private _destroy$ = new Subject<undefined>();
  //#endregion




  //#region Properties


  get settings(): any { return this._settings; }
  get locations(): Location[] | undefined { return this._locations; }
  get accessToken(): string | undefined { return this.tokenStore.accessToken; }

  //#endregion

  //#region Constructor


  constructor(
    private router: Router,
    private menuController: MenuController,
    private settingsService: SettingsService,
    private modalController: ModalController,
    private tokenStore: TokenStoreService,
    private authService: AuthService,
    private storage: LocalStorageService,
    private locationsService: LocationsService,
    private messagingService: MessagingService,
    private translate: TranslateService
  ) {
    this.messagingService.locationChange.pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => this.selectedLocation = this.storage.getObject('location'));
  }

  //#endregion

  //#region Functions

  async ngOnInit(): Promise<void> {
    await this.tokenStore.isReady$;
    this._settings = await this.settingsService.getSettings();
  }
  async changeLocation() {
    this.router.navigateByUrl('/location');
    this.menuController.close('main-menu');
  }
  async navigate(url: string): Promise<void> {
    await this.router.navigateByUrl(url);
    this.menuController.close('main-menu');
  }

  selectLanguage(lang: Language): void {
    this.storage.setObject('lang', lang);
    this.translate.use(lang);
  }

  async aboutModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AboutContactComponent,
      componentProps: {
        html: this.settings.about,
        title: 'About'
      }
    });

    await modal.present();

  }
  async contactModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: AboutContactComponent,
      componentProps: {
        html: this.settings.contact,
        title: 'Contact'
      }
    });

    await modal.present();

  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.menuController.close('main-menu');

  }


  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
  //#endregion
}
