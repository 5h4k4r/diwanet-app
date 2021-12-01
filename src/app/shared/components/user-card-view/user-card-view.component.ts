import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-card-view',
  templateUrl: './user-card-view.component.html',
  styleUrls: ['./user-card-view.component.scss'],
})
export class UserCardViewComponent implements OnInit {
  @Input() user: ServiceMan;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async openProfile() {
    const modal = await this.modalController.create({
      component: UserProfileComponent,
      componentProps: { userId: this.user.id },
      backdropDismiss: true,
      swipeToClose: true,
    });

    await modal.present();

  }
}
