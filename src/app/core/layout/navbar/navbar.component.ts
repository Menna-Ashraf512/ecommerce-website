import { Component, computed, ElementRef, HostListener, inject, input, Input, InputSignal, OnInit, Signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../services/cart/cart.service';
import { WishListService } from '../../services/wishList/wish-list.service';
import { CartSideComponent } from "../../../festures/pages/cart/SideBar/cart-side/cart-side.component";
import { IUser } from '../../../festures/interfaces/userData/iuser';
import { Drawer } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, CartSideComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  
  readonly _authService = inject(AuthService)
  private readonly _cartService = inject(CartService)
  private readonly _wishListService = inject(WishListService)
  @ViewChild('userMenuButton') userMenuButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('userDropdown') userDropdown!: ElementRef<HTMLDivElement>;

  isDropdownOpen = false;
  profileImage: string | null = null;
  isLogin:InputSignal<boolean> = input<boolean>(true) ;
  isEnglish:InputSignal<boolean> = input<boolean>(true) ;
  countCart:Signal<number> = computed( ()=> this._cartService.cartNumber())
  countWish:Signal<number> = computed( ()=> this._wishListService.wishNumber())
  userId: string | null = null;
  userData!:IUser
  drawer!: Drawer;


  ngOnInit(): void {
   this._authService.userData.subscribe({
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

    const $drawerElement = document.getElementById('drawer-disabled-backdrop');
    this.drawer = new Drawer($drawerElement, {
      backdrop: false,
      });  
  }


  openDrawer(){
    this.drawer.show()
  }





  ngAfterViewInit(): void {
    if (!this.userMenuButton || !this.userDropdown) {
      console.error('Button or Dropdown element not found');
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.userDropdown.nativeElement.classList.remove('hidden');
      this.userDropdown.nativeElement.setAttribute('aria-expanded', 'true');
    } else {
      this.userDropdown.nativeElement.classList.add('hidden');
      this.userDropdown.nativeElement.setAttribute('aria-expanded', 'false');
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.isDropdownOpen &&
      !this.userMenuButton.nativeElement.contains(event.target as Node) &&
      !this.userDropdown.nativeElement.contains(event.target as Node)
    ) {
      this.isDropdownOpen = false;
      this.userDropdown.nativeElement.classList.add('hidden');
      this.userDropdown.nativeElement.setAttribute('aria-expanded', 'false');
    }
  }


  

}
