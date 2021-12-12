/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { merge, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/backend/models/category.model';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { UsersService } from 'src/app/backend/services/users.service';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.page.html',
  styleUrls: ['./vip.page.scss'],
})
export class VipPage implements OnInit, OnDestroy {
  //#region Fields
  searchText = '';
  stars = 3;
  showLoadMoreButton = false;

  private _selectedCategoryId: number | undefined;
  private _pageNumber = 0;
  private _limit = 10;
  private _loading = false;
  private _hasError = false;
  private _categories: Category[] = [];
  private _users: ServiceMan[] = [];
  private _newData = new EventEmitter();
  private _destroy$ = new Subject();
  //#endregion


  //#region Properties
  get pageNumber(): number { return this._pageNumber; }
  get limit(): number { return this._limit; }
  get loading(): boolean { return this._loading; }
  get users(): any { return this._users; }
  get categories(): Category[] { return this._categories; }
  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }

  //#endregion


  //#region Constructor


  constructor(
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private messagingService: MessagingService,
    private storage: LocalStorageService,
  ) { }


  //#endregion



  //#region Functions


  async ngOnInit(): Promise<void> {
    this._loading = true;

    this._categories = await this.categoriesService.getCategories();

    this._loading = false;

    this.messagingService.locationChange.pipe(takeUntil(this._destroy$)).subscribe(_ => {
      this._pageNumber = 0;
      this._users = [];
      this.getNewData();
    });

    this._newData.pipe(
      switchMap(() => {
        this._loading = true;
        this._hasError = false;



        return this.usersService.listServiceMen({
          page: this.pageNumber,
          limit: this.limit,
          service_cat_id: this._selectedCategoryId ? this._selectedCategoryId : null,
          vip: true,
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
      this._users = data;
    });
    this.getNewData();
  }

  onSearchChange(event: any): void {
    const value = event.target.value;
    if (value === this.searchText) return;

    this.searchText = value;
    this._newData.emit();
  }

  onSelectionChange($event: any): void {
    this._selectedCategoryId = $event.target?.value;
    this._newData.emit();
  }

  getNewData(): void {
    this._newData.emit();
  }

  onScroll(): void {
    this._pageNumber += 1;
    this.getNewData();
  }


  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  //#endregion

}
