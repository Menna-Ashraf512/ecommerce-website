import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand/brand.service';
import { data } from '../../interfaces/brands/ibrands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private userDataSubscription!: Subscription;
  private _brandService=inject(BrandService)
  brand:data={} as data

ngOnInit(): void {
    this.getABrand()
}
  getABrand():void{
    this._brandService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.brand=res
      }
    })
  }
customOptions: OwlOptions = {
    margin: 30,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    rtl: false,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: false,
  };



  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

}
