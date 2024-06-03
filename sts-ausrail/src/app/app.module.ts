import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './header/nav-menu/nav-menu.component';
import { NavMenuItemsComponent } from './header/nav-menu-items/nav-menu-items.component';
import { PageGridComponent } from './page-grid/page-grid.component';
import { Stage1Component } from './stage-1/stage-1.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    NavMenuComponent,
    NavMenuItemsComponent,
    PageGridComponent,
    Stage1Component,
    MainPageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
