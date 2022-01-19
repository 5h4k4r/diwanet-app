import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { NewsViewComponent } from './components/news-view/news-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsAddComponent } from './components/news-add/news-add.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslationModule } from 'src/app/translation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewsPageRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    TranslationModule,
  ],
  declarations: [NewsPage, NewsViewComponent, NewsAddComponent]
})
export class NewsPageModule { }
