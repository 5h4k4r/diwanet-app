/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Category } from 'src/app/backend/models/category.model';
import { Review } from 'src/app/backend/models/review.model';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { User } from 'src/app/backend/models/user.model';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { UserStoreService } from 'src/app/backend/services/user-store.service';
import { UsersService } from 'src/app/backend/services/users.service';
import { Location } from 'src/app/backend/models/location.model';
import { CategoriesService } from 'src/app/backend/services/categories.service';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  //#region Fields
  @Input() userId: string;



  base64textString: string | undefined;
  base64textStrings: string[] | undefined;
  imageUrl: string | ArrayBuffer | undefined;
  selectedCountry: Location | undefined;


  segmentValue = 'profile';
  rating = 1;
  comment = '';
  userForm = this.fb.group({
    name: ['', Validators.required],
    old_password: ['', this.checkPasswords],
    new_password: ['', this.checkPasswords],
    phone: ['', Validators.required],
    category_id: [0, Validators.required],
    country_id: [0, Validators.required],
    location_id: [0, Validators.required],
    price: [0, Validators.required],
    price_type: ['', Validators.required],
    email: ['', Validators.email],
    profile_pic: [null],
    about: [''],
    facebook: [''],
    instagram: [''],
    snapchat: [''],
  });

  private _user: ServiceMan;
  private _reviews: Review[] = [];
  private _loading = true;
  private _self = false;
  private _editProfile = false;


  private _errorMassage = '';
  private _submitted = false;
  private _categories: Category[] | undefined;
  private _citites: Location[] | undefined;
  private _countries: Location[] | undefined;

  //#endregion

  //#region Properties
  get user(): ServiceMan { return this._user; }
  get reviews(): Review[] { return this._reviews; }
  get loading(): boolean { return this._loading; }
  get self(): boolean { return this._self; }
  get editProfile(): boolean { return this._editProfile; }


  get error() { return this._errorMassage; }
  get submitted() { return this._submitted; }
  get categories(): Category[] { return this._categories; }
  get cities(): Location[] { return this._citites; }
  get countries(): Location[] { return this._countries; }

  //#endregion

  //#region Constructor
  constructor(
    private usersService: UsersService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private userStore: UserStoreService,
    private fb: FormBuilder,
    private locationsService: LocationsService,
    private categoriesService: CategoriesService
  ) { }



  //#endregion


  //#region Functions


  async ngOnInit() {

    try {
      const user = this.userStore.userValue;

      if (user && user.id === parseInt(this.userId, 10)) {
        await this.listCountries();
        await this.getCategories();
        await this.getData(user);
        this.userForm.patchValue(this.user);

        this._self = true;



      }
      else
        this.getData();
    } catch (error) {

    }
  }

  async getData(user?: User): Promise<void> {
    await this.presentLoading();
    try {
      this._loading = true;

      if (user)
        this._user = user.service_man;
      else
        this._user = await this.usersService.getUserById({ id: this.userId });
      this._reviews = this.user.review;

    } catch (error) {

    }

    this.loadingController.dismiss();
    this._loading = false;
  }

  segmentChanged(e: any): void {
    const value = e?.target?.value;
    this.segmentValue = value;

  }

  async postReview(): Promise<void> {
    if (this.rating === null)
      this.rating = 1;

    try {
      const reviewResponse = await this.usersService.reviewUser({
        id_service_man: this.user.id,
        stars: this.rating,
        comment: this.comment
      });
      this._reviews.push(reviewResponse);
      this.comment = null;
    } catch (error) {

    }
  }

  startEditing(): void {

    this._editProfile = true;

  }

  async saveProfile(): Promise<void> {
    this._submitted = true;
    this._editProfile = false;
    if (this.userForm.invalid)
      return;


    try {

      const user = await this.usersService.updateSelf({
        ...this.userForm.value,
        profile_pic: this.base64textString,
        images: this.base64textStrings
      });
      this.userStore.setUser(user);

    } catch (error) {

    }
  }

  processFile(imageInput: any): void {

    const files: File[] = imageInput.files;

    if (files.length > 1)
      this.base64textStrings = [];
    else
      this.base64textString = undefined;

    for (const file of files) {

      const reader = new FileReader();
      if (files.length > 1) {
        reader.onload = this.handleReaderLoadedArray.bind(this);
        reader.readAsBinaryString(file);
        const urlReader = new FileReader();

        urlReader.readAsDataURL(file);

      } else {

        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
        const urlReader = new FileReader();

        urlReader.readAsDataURL(file);
        urlReader.onload = (event) => this.imageUrl = event.target.result;
      }

    }
    // Create form data

    // Store form name as "file" with file data
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


  async openImage(image): Promise<void> {
    const modal = await this.modalController.create({
      component: ImagePreviewComponent,
      componentProps: { image }
    });

    await modal.present();
  }

  closeModal(msg?: string): void {
    this.modalController.dismiss(msg);
  }
  //#endregion

  //#region Private Functions

  private async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  }

  private handleReaderLoadedArray(readerEvt): void {

    const base64String = 'data:image/png;base64,' + btoa(readerEvt.target.result);
    this.base64textStrings.push(base64String);
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

  private async getCategories(): Promise<void> {
    try {
      this._loading = true;
      this._categories = await this.categoriesService.getCategories();
    } catch (error) {

    }
    this._loading = false;
  }

  private checkPasswords(): ValidatorFn {

    return (): ValidationErrors | null => {
      const pass = this.userForm.get('new_password').value;
      const confirmPass = this.userForm.get('new_password').value;

      return pass === confirmPass ? null : { matching: true };
    };
  }

}
  //#endregion
