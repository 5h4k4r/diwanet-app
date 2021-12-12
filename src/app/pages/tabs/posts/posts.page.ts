/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/backend/models/post.model';
import { CommentsService } from 'src/app/backend/services/comments.service';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { PostsService } from 'src/app/backend/services/posts.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';
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
  get access_token(): string { return this.tokenStore.accessToken; }
  //#endregion


  //#region Constructor

  constructor(
    private postsService: PostsService,
    private messagingService: MessagingService,
    private storage: LocalStorageService,
    private commentsService: CommentsService,
    private tokenStore: TokenStoreService,
  ) { }


  //#endregion



  //#region Functions


  ngOnInit() {
    this.messagingService.locationChange.pipe(takeUntil(this._destroy$)).subscribe(_ => {
      this._pageNumber = 0;
      this._posts = [];
      this.getNewData();
    });

    this._newData.pipe(
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

  async addComment(postId: number, inputEvent: any): Promise<void> {
    console.log(postId, inputEvent.value);
    try {
      const response = await this.commentsService.addComment({
        customer_post_id: postId,
        comment: inputEvent.value
      });
    } catch (error) {

    }
    inputEvent.value = null;
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  //#endregion

}

