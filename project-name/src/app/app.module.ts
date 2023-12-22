import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HiddenPageComponent } from './hidden-page/hidden-page.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { TitleDetailsComponent } from './title-details/title-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopularMediaComponent } from './popular-media/popular-media.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { VisDensComponent } from './vis-dens/vis-dens.component';

@NgModule({
  declarations: [
    AppComponent,
    HiddenPageComponent,
    ItemDetailsComponent,
    TitleDetailsComponent,
    NavbarComponent,
    PopularMediaComponent,
    HomeComponent,
    MapComponent,
    VisDensComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
