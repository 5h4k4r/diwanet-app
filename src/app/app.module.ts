import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SideNavPageModule } from './shared/components/side-nav/side-nav.module';
import { RequestInterceptor } from './interceptors/request.interceptor';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SideNavPageModule,
    NgxStarRatingModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
