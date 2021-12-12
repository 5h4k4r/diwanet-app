import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Location } from 'src/app/backend/models/location.model';
import { AuthService } from 'src/app/backend/services/auth.service';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { SettingsService } from 'src/app/backend/services/settings.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';
import { MessagingService } from '../../services/messaging.service';
import { AboutContactComponent } from '../about-contact/about-contact.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.page.html',
  styleUrls: ['./side-nav.page.scss'],
})
export class SideNavPage implements OnInit {

  //#region  Fields
  expanded = false;
  selectedLocation = this.storage.getObject('location');


  private _settings: any;
  private _locations: Location[] | undefined;
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
    private messagingService: MessagingService
  ) { }

  //#endregion

  //#region Functions

  async ngOnInit(): Promise<void> {
    await this.tokenStore.isReady$;
    this._settings = await this.settingsService.getSettings();
    this._locations = await this.locationsService.getLocations();
  }

  async navigate(url: string): Promise<void> {
    await this.router.navigateByUrl(url);
    this.menuController.close('main-menu');
  }

  selectLocation(location: Location): void {
    this.storage.setObject('location', location);
    this.selectedLocation = location;
    this.messagingService.locationChanged();
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

  //#endregion
}
