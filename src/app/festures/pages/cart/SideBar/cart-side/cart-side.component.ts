import { Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartComponent } from "../../cart.component";
import { CartService } from '../../../../../core/services/cart/cart.service';
import { Icart } from '../../../../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-side',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './cart-side.component.html',
  styleUrl: './cart-side.component.scss'
})
export class CartSideComponent implements OnInit {
  private readonly cartService = inject(CartService)

  cartDetails:Icart ={} as Icart
  
ngOnInit(): void {
  this.getCart()
}
getCart():void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{ 
      console.log(res.data);
      this.cartDetails=res.data
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeItem(id:string):void{
  this.cartService.removeSpecificCardItem(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails=res.data
      this.cartService.cartNumber.set(res.numOfCartItems)      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

updateItem(id:string,count:number):void{
  this.cartService.updateCartProduct(id,count).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails=res.data

    },
    error:(err)=>{
      console.log(err);
    }
  })
}

clearUserCart():void{
  this.cartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      if(res.message==='success'){
        this.cartDetails.products.length = 0
        this.cartService.cartNumber.set(0)
      }

    },
    error:(err)=>{
      console.log(err); 
    }
  })
}
}

