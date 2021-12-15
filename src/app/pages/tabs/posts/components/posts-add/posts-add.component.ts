/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/backend/models/category.model';
import { Location } from 'src/app/backend/models/location.model';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { NewsService } from 'src/app/backend/services/news.service';
import { PostsService } from 'src/app/backend/services/posts.service';

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.scss'],
})
export class PostsAddComponent implements OnInit {
  //#region Fields

  form = this.fb.group({
    name: [null, Validators.required],
    phone: [null, Validators.required],
    category_id: [null, Validators.required],
    location_id: [null, Validators.required],
    detail: [null, Validators.required]
  });

  private _categories: Category[] | undefined;
  private _locations: Location[] | undefined;
  private _submitted = false;
  private _hasError = false;
  private _loading = false;
  //#endregion


  //#region Properties
  get locations(): Location[] | undefined { return this._locations; }
  get categories(): Category[] | undefined { return this._categories; }
  get submitted(): boolean { return this._submitted; }
  get hasError(): boolean { return this._hasError; }
  get loading(): boolean { return this._loading; }
  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }


  //#endregion


  //#region Constructor

  constructor(
    private modalController: ModalController,
    private postsService: PostsService,
    private fb: FormBuilder,
    private storage: LocalStorageService,
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
  ) { }


  //#endregion


  //#region Functions

  ngOnInit() {
    this.getCategories();
    this.getLocations();
  }

  async addPost(): Promise<void> {
    this._submitted = true;
    if (!this.form.valid) return;

    this._loading = true;
    this._hasError = false;

    const form = this.form.value;

    try {

      await this.postsService.addPost(form);
      // this.closeModal();
    } catch (error) {

      this._hasError = true;

    }

    this._loading = false;

  }

  async getCategories(): Promise<void> {
    this._hasError = false;
    this._loading = true;
    try {

      this._categories = await this.categoriesService.getCategories();

    } catch (error) {
      this._hasError = true;
    }
    this._loading = false;
  }

  async getLocations(): Promise<void> {
    this._hasError = false;
    this._loading = true;
    try {

      this._locations = await this.locationsService.getLocations();

    } catch (error) {
      this._hasError = true;
    }
    this._loading = false;
  }

  async closeModal(msg?: any): Promise<void> {
    await this.modalController.dismiss(msg);
  }
  //#endregion



  //#region Private Functions

  //#endregion
}
