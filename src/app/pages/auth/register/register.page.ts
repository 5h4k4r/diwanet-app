/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/backend/models/category.model';
import { Location } from 'src/app/backend/models/location.model';
import { RegisterResponse } from 'src/app/backend/models/registerResponse.model';
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

  base64textString: string | undefined;
  imageUrl: string | ArrayBuffer | undefined;
  imageInput: any;
  selectedCountry: Location | undefined;
  ngForm = this.fb.group({
    name: ['name', Validators.required],
    password: ['1q2w3e', Validators.required],
    phone: ['123123', Validators.required],
    category_id: [1, Validators.required],
    country_id: [2, Validators.required],
    location_id: [2, Validators.required],
    price: [123, Validators.required],
    price_type: ['hour', Validators.required],
    email: ['e@mail.com', Validators.email],
    image: [null],
    about: ['about'],
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
  private _categories: Category[] | undefined;
  private _citites: Location[] | undefined;
  private _countries: Location[] | undefined;
  //#endregion

  //#region Properties
  get loading() { return this._loading; }
  get error() { return this._errorMassage; }
  get submitted() { return this._submitted; }
  get categories(): Category[] { return this._categories; }
  get cities(): Location[] { return this._citites; }
  get countries(): Location[] { return this._countries; }

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

  //#region Funtions
  async ngOnInit(): Promise<void> {
    this.listCountries();
    await this.getCategories();

  }

  async register() {
    this._errorMassage = '';
    if (this.ngForm.invalid || this.loading) {
      return;
    }
    this._submitted = true;

    this._loading = true;
    this._errorMassage = '';

    const formData = this.ngForm.value;
    try {
      const response: RegisterResponse = await this.authService.register({
        ...formData,
        image: this.base64textString
      });
      this.tokenStore.applyAuthToken(response.access_token);
      await this.resolveRoute();
    } catch (error) {
      this._errorMassage = 'Something is Wrong';
    }


    this._submitted = false;
    this._loading = false;
    // this.ngForm.reset();
  }

  processFile(imageInput: any): void {

    this.base64textString = undefined;
    const files: File[] = imageInput.files;

    for (const file of files) {

      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      const urlReader = new FileReader();

      urlReader.readAsDataURL(file);
      urlReader.onload = (event) => this.imageUrl = event.target.result;

      // this.imageInput = null;
    }

    // Create form data

    // Store form name as "file" with file data
  }

  hideShowPassword() {

    if (this.passwordType === 'text') {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
    if (this.passwordIcon === 'eye-off-outline') {
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordIcon = 'eye-off-outline';
    }
  }
  countryChanged(e: any): void {
    const id = e.target?.value;
    this.selectedCountry = id;
    this.listCities(id);

  }


  async listCities(id: number): Promise<void> {
    try {
      this._loading = true;
      this._citites = await this.locationsService.listCities({
        id
      });
    } catch (error) {

    }
    this._loading = false;
  }
  //#endregion

  //#region Private Functions
  private resolveRoute() {
    this.router.navigate(['/tabs/suggests']);
  }

  private async getCategories(): Promise<void> {
    try {
      this._loading = true;
      this._categories = await this.categoriesService.getCategories();
    } catch (error) {

    }
    this._loading = false;
  }

  private handleReaderLoaded(readerEvt): void {

    const base64String = 'data:image/png;base64,' + btoa(readerEvt.target.result);
    this.base64textString = base64String;
  }
  private async listCountries(): Promise<void> {
    this._loading = true;
    try {
      this._countries = await this.locationsService.listCountries();
    } catch (error) {

    }
    this._loading = false;
  }


  //#endregion


}
