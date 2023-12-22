import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import {HomeComponent} from "./home/home.component";
import {TitleDetailsComponent} from "./title-details/title-details.component"; // Component for item details
import { VisDensComponent } from './vis-dens/vis-dens.component';

// old empty routes
//const routes: Routes = [];
const routes: Routes = [
  { path: 'title/:id', component: TitleDetailsComponent},
  { path: 'item/:id', component: ItemDetailsComponent }, // Define the route for item details
  { path: 'visualising-density', component: VisDensComponent},
  { path: 'home', component: HomeComponent},
  {path: '', redirectTo: "/home", pathMatch: 'full'}// Route back to home
  // Other routes for different pages if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
