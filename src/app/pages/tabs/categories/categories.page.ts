/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/backend/models/category.model';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { UsersService } from 'src/app/backend/services/users.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  //#region Fields
  private _selectedCategory: Category;
  private _loading = false;
  private _categories: Category[];
  private _users: ServiceMan[];
  //#endregion


  //#region Properties
  get selectedCategory(): Category { return this._selectedCategory; }
  get loading(): boolean { return this._loading; }
  get categories(): Category[] { return this._categories; }
  get users(): ServiceMan[] { return this._users; }
  //#endregion


  //#region Constructor

  constructor(
    private categoriesService: CategoriesService,
    private usersService: UsersService,
  ) { }


  //#endregion


  //#region Functions


  ngOnInit() {
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
    try {
      this._users = await this.usersService.listServiceMen({ service_cat_id: this.selectedCategory.id });
    } catch (error) {

    }
    this._loading = false;
  }

  clearCategory(): void {
    this._selectedCategory = null;
  }
  //#endregion

}
