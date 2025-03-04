import { Component, inject } from '@angular/core';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { WishList } from '../../../shared/interfaces/wish-list';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
    private readonly wishListService = inject(WishListService)
    private readonly _cartService=inject(CartService)
    isLoadingCart=false;
    isLoadingRemove=false;
    wishList:WishList ={} as WishList
      
    ngOnInit(): void {
      this.getWishList()
    }

    getWishList():void{
      this.wishListService.getLoggedUserWishList().subscribe({
        next:(res)=>{ 
          this.wishList=res
          this.wishListService.wishNumber.set(res.count);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }


    removeItem(id:string):void{
      this.isLoadingRemove=true
      this.wishListService.removeSpecificFromWishList(id).subscribe({
        next:(res)=>{
          if(res.status === "success"){
            this.getWishList();
          }
        },
        error:(err)=>{
          console.log(err)
          this.isLoadingRemove=false;
        },
        complete: () => (this.isLoadingRemove = false),
      })
    }


    addCartItem(id: string): void {
      this.isLoadingCart = true;
      this._cartService.addProductToCart(id).subscribe({
        next: (res) => {
          this._cartService.cartNumber.set(res.numOfCartItems);
        },
       error:(err)=>{
        console.log(err)
       this.isLoadingCart = false
       } ,
  
        complete: () => (this.isLoadingCart = false),
      });
    }
}



