import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from '../../../../../node_modules/jwt-decode';
import { IUser } from '../../interfaces/userData/iuser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  private readonly authService = inject(AuthService);
  

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;

      if (userId) {
        this.authService.getUser(userId).subscribe({
          next: (response) => {
            this.authService.userProfile.next(response.data);
            console.log('User Profile:', response.data);
          },
        });
      }
    }
  }
}