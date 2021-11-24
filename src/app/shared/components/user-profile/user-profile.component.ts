/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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


  //#endregion

  //#region Properties
  get user(): ServiceMan { return this._user; }
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
      this._user = await this.usersService.getUserById({ id: this.userId });
      console.log(this.user);
    } catch (error) {

    }
    this.loadingController.dismiss();

  }

  segmentChanged(e: any): void {
    const value = e?.target?.value;
    this.segmentValue = value;

  }

  async postReview(): Promise<void> {
    if (this.rating === null)
      this.rating = 1;

    try {
      await this.usersService.reviewUser({
        id_service_man: this.user.id,
        stars: this.rating,
        comment: this.comment
      });

      this.user.review.push({
        comment: this.comment,
        stars: this.rating,
        id_service_man: this.user.id
      });
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
