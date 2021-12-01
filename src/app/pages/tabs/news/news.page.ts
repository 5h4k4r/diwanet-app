import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { News } from 'src/app/backend/models/news.model';
import { NewsService } from 'src/app/backend/services/news.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';
import { NewsViewComponent } from './components/news-view/news-view.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  //#region Fields

  private _newsList: News[] | undefined;
  private _loading = false;
  private _hasError = false;
  //#endregion


  //#region Properties

  get newsList(): News[] { return this._newsList; }
  get isAndroid(): boolean { return this.platform.is('android'); }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }

  get accessToken(): string | undefined { return this.tokenStore.accessToken; }
  //#endregion



  //#region Constructor

  constructor(
    private newsService: NewsService,
    private platform: Platform,
    private modalController: ModalController,
    private tokenStore: TokenStoreService,
  ) { }


  //#endregion


  //#region Functions

  ngOnInit() {
    this.listNews();
  }

  async listNews(): Promise<void> {

    this._hasError = false;
    this._loading = true;

    try {

      this._newsList = await this.newsService.getNews();

    } catch (error) {

      this._hasError = true;

    }
    this._loading = false;

  }

  addNews(): void {

  }

  async openNews(id: number) {
    const modal = await this.modalController.create({
      component: NewsViewComponent,
      componentProps: { id }
    });

    await modal.present();

  }
  //#endregion

}
