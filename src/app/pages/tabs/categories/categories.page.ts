/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import { switchMap, map, takeUntil, catchError } from 'rxjs/operators';
import { Category } from 'src/app/backend/models/category.model';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { UsersService } from 'src/app/backend/services/users.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {
  //#region Fields
  private _selectedCategory: Category;
  private _loading = false;
  private _categories: Category[];
  private _users: ServiceMan[];
  private _limit = 10;
  private _pageNumber = 0;
  private _hasError = false;
  private _getServiceMen = new EventEmitter<undefined>();
  private _destroy$ = new Subject();
  //#endregion


  //#region Properties
  get selectedCategory(): Category { return this._selectedCategory; }
  get loading(): boolean { return this._loading; }
  get categories(): Category[] { return this._categories; }
  get users(): ServiceMan[] { return this._users; }
  get limit(): number { return this._limit; }
  get hasError(): boolean { return this._hasError; }
  get pageNumber(): number { return this._pageNumber; }
  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }

  //#endregion


  //#region Constructor

  constructor(
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private messagingService: MessagingService,
    private storage: LocalStorageService,
  ) { }


  //#endregion


  //#region Functions


  ngOnInit() {
    this.messagingService.locationChange.pipe(takeUntil(this._destroy$)).subscribe(_ => {
      this._pageNumber = 0;
      this._users = [];
      if (this._selectedCategory)
        this.listServiceMen();
    });

    this._getServiceMen.pipe(
      switchMap(() => {
        this._loading = true;
        this._hasError = false;



        return this.usersService.listServiceMen({
          page: this.pageNumber,
          limit: this.limit,
          location_id: this.location_id,
          service_cat_id: this.selectedCategory.id
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
      if (!this._users?.length)
        this._users = data ?? [];
      else
        this._users = this._users?.concat(data ?? []);

    });
    this.getCategories();
  }

  async getCategories(): Promise<void> {
    this._loading = true;

    try {
      this._categories = await this.categoriesService.getCategories();
    } catch (error) {

    }
    this._loading = false;
  }

  async selectCategory(cat: Category): Promise<void> {
    this._loading = true;
    this._selectedCategory = cat;
    this._users = [];
    this.listServiceMen();
  }

  listServiceMen(): void {
    this._getServiceMen.emit();
  }

  onScroll(): void {
    this._pageNumber += 1;
    this.listServiceMen();
  }

  clearCategory(): void {
    this._selectedCategory = null;
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  //#endregion

}
