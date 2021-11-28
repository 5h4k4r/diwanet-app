import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.page.html',
  styleUrls: ['./side-nav.page.scss'],
})
export class SideNavPage implements OnInit {

  constructor(
    private router: Router,
    private menuController: MenuController,
  ) { }

  ngOnInit() {
  }

  async navigate(url: string): Promise<void> {
    await this.router.navigateByUrl(url);
    this.menuController.close('main-menu');
  }
  aboutModal(): void {

  }
  contactModal(): void {

  }
}
