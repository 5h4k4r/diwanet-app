/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/backend/models/post.model';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { PostsService } from 'src/app/backend/services/posts.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  //#region Fields
  showLoadMoreButton = false;

  private _posts: Post[] | undefined;
  private _loading = false;
  private _hasError = false;
  private _pageNumber = 0;
  private _limit = 10;
  private _newData = new EventEmitter<undefined>();
  private _destroy$ = new Subject();
  //#endregion


  //#region Properties
  get posts(): Post[] | undefined { return this._posts; }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }
  get pageNumber(): number { return this._pageNumber; }
  get limit(): number { return this._limit; }
  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }

  //#endregion


  //#region Constructor

  constructor(
    private postsService: PostsService,
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



        return this.postsService.getCustomerPosts({
          page: this.pageNumber,
          limit: this.limit,
          location_id: this.location_id
        });
      }),
      map(data => {

        if (!data?.length || data?.length < this.limit) this.showLoadMoreButton = false;


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
      this._pageNumber += 1;
      this._posts = data;
    });
    this.getNewData();
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

