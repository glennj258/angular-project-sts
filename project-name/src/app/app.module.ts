import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImgCaptionComponent } from './vis-dens/img-caption/img-caption.component';
import { LightRailComponent } from './light-rail/light-rail.component';
import { HonoursComponent } from './honours/honours.component';
import { AccessMapComponent } from './honours/access-map/access-map.component';
import { SelectorSidebarComponent } from './honours/selector-sidebar/selector-sidebar.component';
import { UrbanistContentComponent } from './urbanist-content/urbanist-content.component';

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
    VisDensComponent,
    ImgCaptionComponent,
    LightRailComponent,
    HonoursComponent,
    AccessMapComponent,
    SelectorSidebarComponent,
    UrbanistContentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
