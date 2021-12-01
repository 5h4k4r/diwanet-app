import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { promise } from 'selenium-webdriver';
import { News } from 'src/app/backend/models/news.model';
import { NewsService } from 'src/app/backend/services/news.service';
import { ImagePreviewComponent } from 'src/app/shared/components/image-preview/image-preview.component';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss'],
})
export class NewsViewComponent implements OnInit {
  //#region Fields


  @Input() id: number;

  private _news: News | undefined;
  private _loading = true;
  private _hasError = false;

  //#endregion

  //#region Properties
  get news(): News { return this._news; }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }
  get sliderOptions(): any {
    return {
      zoom: false,
      slidesPerView: 1.5,
      ceteredSlides: true,
      spaceBetween: 5,
    };
  }
  //#endregion


  //#region Constructor


  constructor(
    private newsService: NewsService,
    private modalController: ModalController
  ) { }



  //#endregion



  //#region Functions


  ngOnInit() {
    this.getNewsById();
  }

  async getNewsById(): Promise<void> {
    this._loading = true;
    this._hasError = false;

    try {

      this._news = await this.newsService.getNewsById({ id: this.id });
    } catch (error) {

      this._hasError = false;
    }

    this._loading = false;
  }

  async openImage(image): Promise<void> {
    const modal = await this.modalController.create({
      component: ImagePreviewComponent,
      componentProps: { image }
    });

    await modal.present();
  }

  closeModal(msg?: string): void {
    this.modalController.dismiss(msg);
  }
  //#endregion
}
