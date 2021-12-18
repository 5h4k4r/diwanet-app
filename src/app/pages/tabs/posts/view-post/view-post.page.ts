/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/backend/models/post.model';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { PostsService } from 'src/app/backend/services/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.page.html',
  styleUrls: ['./view-post.page.scss'],
})
export class ViewPostPage implements OnInit {
  //#region Fields

  private _post: Post | undefined;
  private _loading = true;
  private _hasError = false;

  //#endregion


  //#region Properties
  get post(): Post | undefined { return this._post; }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }

  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }

  //#endregion



  //#region Constructor


  constructor(
    private postsService: PostsService,
    private storage: LocalStorageService,
    private activatedRoute: ActivatedRoute,
  ) { }


  //#endregion


  //#region Functions


  ngOnInit() {
    // this.activatedRoute.queryParams.pipe(takeUntil(this._destroy$)).subscribe()
    // http://localhost:8100/tabs/posts/view-post?code=gmj5ja&phone=07501480881&id=6
    this.getPost();
  }

  async getPost(): Promise<void> {
    this._loading = true;
    this._hasError = false;
    const { phone, code, id } = this.activatedRoute.snapshot.queryParams;

    if (!id) return;
    try {
      this._post = await this.postsService.getSingle({
        id,
        code,
        phone,
        location_id: this.location_id,
      });
    } catch (error) {
      this._hasError = true;
    }

    this._loading = false;
  }

  //#endregion


  //#region Private Functions


  //#endregion

}
