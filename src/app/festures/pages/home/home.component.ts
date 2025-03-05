import { Component, inject, OnInit } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { BrandsComponent } from "../brands/brands.component";

@Component({
  selector: 'app-home',
  imports: [RecentProductsComponent, PopularCategoryComponent, MainSliderComponent, BrandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {


}
