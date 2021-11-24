import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/backend/models/category.model';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { UsersService } from 'src/app/backend/services/users.service';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.page.html',
  styleUrls: ['./vip.page.scss'],
})
export class VipPage implements OnInit, OnDestroy {
  //#region Fields
  searchText = '';
  stars = 3;
  _selectedCategory = 'all';

  private _loading = false;
  private _categories: Category[] = [];
  private _users: ServiceMan[] = [];
  private _getDataEvent = new EventEmitter();
  private _destroy$ = new Subject();
  //#endregion


  //#region Properties
  get loading(): boolean { return this._loading; }
  get users(): any { return this._users; }
  get categories(): Category[] { return this._categories; }
  //#endregion


  //#region Constructor


  constructor(
    private usersService: UsersService,
    private categoriesService: CategoriesService,
  ) { }


  //#endregion



  //#region Functions


  async ngOnInit(): Promise<void> {
    this._loading = true;

    this._categories = await this.categoriesService.listCategories();

    this._loading = false;

    this.loadDataAsync();
    merge(this._getDataEvent).pipe(takeUntil(this._destroy$)).subscribe(_ => {
      this.loadDataAsync();
    });
  }

  onSearchChange(event: any): void {
    const value = event.target.value;
    if (value === this.searchText) return;

    this.searchText = value;
    this._getDataEvent.emit();
  }
  async loadDataAsync(): Promise<void> {
    this._loading = true;

    try {
      this._users = await this.usersService.listVIPUsers();

    } catch (error) {

    }


    this._loading = false;
  }

  onSelectionChange($event: any): void {
    this._getDataEvent.emit();
  }


  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  //#endregion

}
