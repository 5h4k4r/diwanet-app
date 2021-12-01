/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/backend/models/category.model';
import { Location } from 'src/app/backend/models/location.model';
import { AuthService } from 'src/app/backend/services/auth.service';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //#region Fields

  ngForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
    category_id: ['', Validators.required],
    location_id: ['', Validators.required],
    price: ['', Validators.required],
    price_type: ['', Validators.required],
    email: ['', Validators.email],
    image: [null],
    about: [''],
    facebook: [''],
    instagram: [''],
    snapchat: [''],
  });;
  // tslint:disable: variable-name
  passwordType = 'password';
  passwordIcon = 'eye-off-outline';

  hide = true;
  private _loading = false;
  private _errorMassage = '';
  private _submitted = false;
  private _returnUrl: string;
  private _categories: Category[] | undefined;
  private _locations: Location[] | undefined;
  //#endregion

  //#region Properties
  get loading() { return this._loading; }
  get error() { return this._errorMassage; }
  get submitted() { return this._submitted; }
  get categories(): Category[] { return this._categories; }
  get locations(): Location[] { return this._locations; }
  //#endregion

  //#region Constructor
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private tokenStore: TokenStoreService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
  ) {

  }
  //#endregion
  //  {
  //   name: string;
  //   phone: string;
  //   category_id: number;
  //   location_id: number;
  //   price: number;
  //   price_type: 'day' | 'hour';
  //   password: string;
  //   email?: string;
  //   image?: any;
  //   about?: string;
  //   facebook?: string;
  //   instagram?: string;
  //   snapchat: string;

  // }
  //#region Funtions
  async ngOnInit(): Promise<void> {
    await this.getLocations();
    await this.getCategories();

  }

  async register() {
    if (this.ngForm.invalid || this.loading) {
      return;
    }
    this._submitted = true;

    this._loading = true;
    this._errorMassage = '';

    const formData = this.ngForm.value;
    try {
      await this.authService.register(formData);
      await this.resolveRoute();
    } catch (error) {
      this._errorMassage = 'Something is Wrong';
    }


    this._submitted = false;
    this._loading = false;
    this.ngForm.reset();
  }

  hideShowPassword() {

    if (this.passwordType === 'text') {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
    if (this.passwordIcon === 'eye-off') {
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordIcon = 'eye-off-outline';
    }
  }
  //#endregion

  //#region Private Functions
  private resolveRoute() {
    this.router.navigate([this._returnUrl]);
  }

  private async getLocations(): Promise<void> {
    try {
      this._loading = true;
      this._locations = await this.locationsService.getLocations();
    } catch (error) {

    }
    this._loading = false;
  }

  private async getCategories(): Promise<void> {
    try {
      this._loading = true;
      this._categories = await this.categoriesService.getCategories();
    } catch (error) {

    }
    this._loading = false;
  }


  //#endregion


}
