import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { NewsViewComponent } from './components/news-view/news-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsAddComponent } from './components/news-add/news-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    SharedModule,
  ],
  declarations: [NewsPage, NewsViewComponent, NewsAddComponent]
})
export class NewsPageModule { }
