/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Review } from 'src/app/backend/models/review.model';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { UsersService } from 'src/app/backend/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  //#region Fields
  @Input() userId: string;
  _user: ServiceMan;
  segmentValue = 'profile';
  rating = 1;
  comment = '';

  private _reviews: Review[] = [];
  private _loading = true;
  //#endregion

  //#region Properties
  get user(): ServiceMan { return this._user; }
  get reviews(): Review[] { return this._reviews; }
  get loading(): boolean { return this._loading; }
  //#endregion

  //#region Constructor
  constructor(
    private usersService: UsersService,
    private loadingController: LoadingController,
    private modalController: ModalController,
  ) { }



  //#endregion


  //#region Functions


  ngOnInit() {
    this.getData();
  }

  async getData(): Promise<void> {
    this.presentLoading();
    try {
      this._loading = true;
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

  //#endregion
}
