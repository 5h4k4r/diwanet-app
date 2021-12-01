import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/backend/services/auth.service';
import { SettingsService } from 'src/app/backend/services/settings.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';
import { AboutContactComponent } from '../../pages/about-contact/about-contact.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.page.html',
  styleUrls: ['./side-nav.page.scss'],
})
export class SideNavPage implements OnInit {
  private _settings: any;



  get settings(): any { return this._settings; }
  get accessToken(): string | undefined { return this.tokenStore.accessToken; }

  constructor(
    private router: Router,
    private menuController: MenuController,
    private settingsService: SettingsService,
    private modalController: ModalController,
    private tokenStore: TokenStoreService,
    private authService: AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.tokenStore.isReady$;
    this._settings = await this.settingsService.getSettings();
  }

  async navigate(url: string): Promise<void> {
    await this.router.navigateByUrl(url);
    this.menuController.close('main-menu');
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
}
