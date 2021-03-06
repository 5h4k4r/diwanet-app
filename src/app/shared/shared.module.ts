import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { IonicModule } from '@ionic/angular';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { UserOnMapComponent } from './components/user-on-map/user-on-map.component';
import { UserCardViewComponent } from './components/user-card-view/user-card-view.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { AboutContactComponent } from './components/about-contact/about-contact.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
;

const components = [
  UserProfileComponent,
  UserOnMapComponent,
  RatingStarsComponent,
  UserCardViewComponent,
  ImagePreviewComponent,
  AboutContactComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    GoogleMapsModule,
    TranslateModule,
  ],
  exports: [...components]
})
export class SharedModule { }
