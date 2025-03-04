import { Component, computed, inject, input, Input, InputSignal, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../services/cart/cart.service';
import { WishListService } from '../../services/wishList/wish-list.service';
import { CartSideComponent } from "../../../festures/pages/cart/SideBar/cart-side/cart-side.component";
import { InputImagesService } from '../../services/images/input-images.service';
import { IUser } from '../../../festures/interfaces/userData/iuser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, CartSideComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private imageService: InputImagesService){}
  
  readonly _authService = inject(AuthService)
  private readonly _cartService = inject(CartService)
  private readonly _wishListService = inject(WishListService)
  
  profileImage: string | null = null;
  isLogin:InputSignal<boolean> = input<boolean>(true) ;
  isEnglish:InputSignal<boolean> = input<boolean>(true) ;
  countCart:Signal<number> = computed( ()=> this._cartService.cartNumber())
  countWish:Signal<number> = computed( ()=> this._wishListService.wishNumber())
  userId: string | null = null;
  userData!:IUser

  ngOnInit(): void {
   this._authService.userProfile.subscribe({
    next:(res)=>{
      this.userData=res
      console.log(this.userData)
    }
   })

    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this._cartService.cartNumber.set(res.numOfCartItems);
      }
    });

    this._wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this._wishListService.wishNumber.set(res.count);
      }
    });

    // Load profile image if userId is available
    if (this.userId) {
      this.loadProfileImage();
    }
  }

  loadProfileImage(): void {
    const image = this.imageService.getImage(this.userId);
    if (image) {
      this.profileImage = image;
    }
  }


}
