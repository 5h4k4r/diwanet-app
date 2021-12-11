/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { merge, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { News } from 'src/app/backend/models/news.model';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { NewsService } from 'src/app/backend/services/news.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { NewsAddComponent } from './components/news-add/news-add.component';
import { NewsViewComponent } from './components/news-view/news-view.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy {
  //#region Fields
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private _newsList: News[] | undefined;
  private _loading = false;
  private _hasError = false;
  private _newData = new EventEmitter<undefined>();
  private _destroy$ = new Subject();


  private _pageNumber = 0;
  private _limit = 3;

  //#endregion


  //#region Properties

  get newsList(): News[] { return this._newsList; }
  get isAndroid(): boolean { return this.platform.is('android'); }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }

  get accessToken(): string | undefined { return this.tokenStore.accessToken; }

  get pageNumber(): number { return this._pageNumber; }
  get limit(): number { return this._limit; }
  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }
  //#endregion



  //#region Constructor

  constructor(
    private newsService: NewsService,
    private platform: Platform,
    private modalController: ModalController,
    private tokenStore: TokenStoreService,
    private messagingService: MessagingService,
    private storage: LocalStorageService,
  ) { }


  //#endregion


  //#region Functions

  ngOnInit() {
    merge(this.messagingService.locationChange, this._newData).pipe(
      switchMap(() => {
        this._loading = true;
        this._hasError = false;



        return this.newsService.getNews({
          page: this.pageNumber,
          limit: this.limit,
          location_id: this.location_id
        });
      }),
      map(data => {


        this._loading = false;

        return data;
      }),
      takeUntil(this._destroy$),
      catchError(() => {
        this._loading = false;
        this._hasError = true;
        return of([]);
      })
    ).subscribe(data => {
      if (!this._newsList?.length)
        this._newsList = data ?? [];
      else
        this._newsList = this._newsList?.concat(data ?? []);

    });
    this.getNewData();
  }

  async addNews(): Promise<void> {
    const modal = await this.modalController.create({
      component: NewsAddComponent
    });

    await modal.present();
    const response = await modal.onDidDismiss();
    console.log(response);
  }
  async openNews(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: NewsViewComponent,
      componentProps: { id }
    });

    await modal.present();

  }

  getNewData(): void {
    this._newData.emit();
  }

  onScroll(): void {
    this._pageNumber += 1;
    this.getNewData();
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  //#endregion


}
